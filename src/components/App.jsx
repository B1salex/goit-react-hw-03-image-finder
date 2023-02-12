import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { AppStyle } from './App.styled';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMore } from './LoadMore/LoadMore';
import { Loader } from './Loader/Loader';
import { imagesAPI } from './Servise/FetchImages';
import { ToastContainer, toast } from 'react-toastify';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    status: 'idle',
    openButtonLoadMore: false,
  };

  handleFormSubmit = query => {
    this.setState({ page: 1, query, images: [] });
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      this.setState({
        isLoading: true,
      });

      this.getPictures(query, page);
    }
  }

  getPictures = (query, page) => {
    imagesAPI
      .fetchImages(query, page)
      .then(images => {
        if (images.hits.length < 1) {
          return toast.info(
            `😅 Unfortunately the world is not that creative yet, so we did not find pictures on request ${query}. Try something less eccentric and we'll make you happy!`
          );
        }

        this.setState(prevState => ({
          query,
          images: [...prevState.images, ...images.hits],
          page,
          totalImg: images.totalHits,
        }));
      })
      .catch(error => {
        this.setState({
          error,
        });
      })
      .finally(() => {
        this.setState({
          isLoading: false,
        });
      });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      status: 'pending',
    }));
  };

  render() {
    const { images, status, query, openButtonLoadMore } = this.state;

    if (status === 'idle') {
      return (
        <AppStyle>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <p>Enter the name of the picture</p>
        </AppStyle>
      );
    }

    if (status === 'pending') {
      return (
        <AppStyle>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <ImageGallery items={images} />
          <Loader />
          <ToastContainer />
        </AppStyle>
      );
    }

    if (status === 'resolved') {
      return (
        <AppStyle>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <ImageGallery items={images} />
          {openButtonLoadMore && <LoadMore onClick={this.loadMore} />}
        </AppStyle>
      );
    }

    if (status === 'rejected') {
      return (
        <AppStyle>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <h1>{`No results containing ${query} were found.`}</h1>
        </AppStyle>
      );
    }
  }
}
