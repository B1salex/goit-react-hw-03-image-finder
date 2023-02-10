import { Component } from "react";
import { Searchbar } from './Searchbar/Searchbar';
import { AppStyle } from './App.styled';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMore } from "./LoadMore/LoadMore";
import { Loader } from './Loader/Loader';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    status: "idle",
    openButtonLoadMore: false,
  }

  handleFormSubmit = query => {
    this.setState({ page:1, query, images: [] });
  };

  componentDidUpdate(prevProps, prevState) {
    const { page, query } = this.state
    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = '32850209-97f2951747f8bc30e5bbd4a42';
      
    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ status: 'pending'})
      fetch(`${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
        .then(response => response.json())
        .then(searchInfo => {
          if (searchInfo.hits.length !== 0) {
            if (searchInfo.totalHits - 12 * page > 0) {
              this.setState({ openButtonLoadMore: true})
            } else {
              this.setState({ openButtonLoadMore: false })
            }
            return  this.setState(prevState => ({ images: [...prevState.images, ...searchInfo.hits], status: 'resolved'}))
          }
          this.setState({ status: 'rejected' })
          return Promise.reject(
            new Error("Sory, no result!")
          )
        })
        .catch((error) => {
          this.setState({error, status: 'rejected' })
        })
    }
  } 

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      status: 'pending',
    }));
  };

  render() {
    const { images, status, query, openButtonLoadMore } = this.state;

    if (status === "idle") {
      return (
        <AppStyle>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <p>Enter the name of the picture</p>
        </AppStyle>
      );
    }

    if (status === "pending") {
      return (
        <AppStyle>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <ImageGallery items={images} />
          <Loader />
        </AppStyle>       
      );
    }

    if (status === "resolved") {
      return (
        <AppStyle>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <ImageGallery items={images} />
          {openButtonLoadMore && <LoadMore onClick={this.loadMore} />}
        </AppStyle>
      );
    }

    if (status === "rejected") {
      return (
        <AppStyle>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <h1>{`No results containing ${query} were found.`}</h1>
        </AppStyle>
      );
    }
  }
};
