import React, { Component } from 'react';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Searchbar from './Searchbar/Searchbar';
import Modal from './Modal/Modal';
import * as API from '../services/api';
import './App.css';

export default class App extends Component {
  state = {
    page: 1,
    searchName: '',
    largeImage: '',
    items: [],
    isLoading: false,
    error: null,
    sb: false,
  };

  openModalOpen = ({ target }) => {
    this.setState({
      largeImage: target.dataset.src,
    });
  };

  onModalClose = () => {
    this.setState({
      largeImage: '',
    });
  };

  handleFormSubmit = searchName => {
    if (searchName.trim().length === 0) {
      alert('Please, enter request');
      return;
    }

    this.setState({
      searchName,
      page: 1,
      items: [],
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  getImages = async (searchName, page) => {
    try {
      this.setState({
        isLoading: true,
      });
      const { images, totalHits } = await API.loadImage(searchName, page);

      this.setState(prevState => ({
        items: [...prevState.items, ...images],
        sb: this.state.page < Math.ceil(totalHits / 12),
      }));
      if (images.length === 0) {
        alert(
          "Sorry, we can't find anyting for your request. Please, enter another request"
        );
      }
    } catch (error) {
      this.setState({
        error: error.message,
      });
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.searchName !== this.state.searchName
    ) {
      this.getImages(this.state.searchName, this.state.page);
    }
  }

  render() {
    const { items, largeImage, isLoading, error, sb } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleFormSubmit} isLoading={isLoading} />
        {error && <p>{error}</p>}
        {items.length > 0 && (
          <ImageGallery items={items} onClick={this.openModalOpen} />
        )}
        {isLoading && <Loader />}
        {sb && <Button onClick={this.handleLoadMore} isLoading={isLoading} />}
        {largeImage && <Modal onClose={this.onModalClose} url={largeImage} />}
      </div>
    );
  }
}
