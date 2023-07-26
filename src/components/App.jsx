import React, { Component } from 'react';
import GetImages from './Api/Api';
import Searchbar from './searchbar/Searshbar';
import Modal from './modal/Modal';
import ImageGallery from './imagegalery/ImageGallery';
import Button from './button/Button';
import Loader from './loader/Loader';
import styles from './App.module.css';

export class App extends Component {
  state = {
    images: [],
    page: 1,
    isLoading: false,
    largeImageURL: '',
    showModal: false,
    searchQuery: '',
  };

  handleSearchSubmit = query => {
    this.setState({
      images: [],
      page: 1,
      searchQuery: query,
    });
    this.getImages(query, 1);
  };

  handleLoadMore = () => {
    const { searchQuery, page } = this.state;
    this.getImages(searchQuery, page + 1);
  };

  handleImageClick = imageURL => {
    this.setState({
      largeImageURL: imageURL,
      showModal: true,
    });
  };

  handleCloseModal = () => {
    this.setState({
      largeImageURL: '',
      showModal: false,
    });
  };

  async getImages(query, page) {
    this.setState({ isLoading: true });
    const newImages = await GetImages(query, page);
    this.setState(prevState => ({
      images: [...prevState.images, ...newImages],
      page: prevState.page + 1,
      isLoading: false,
    }));
  }

  render() {
    const { images, isLoading, largeImageURL, showModal } = this.state;

    return (
      <div className={styles.App}>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery images={images} onClick={this.handleImageClick} />
        {isLoading && <Loader />}
        {images.length > 0 && !isLoading && (
          <Button onClick={this.handleLoadMore} />
        )}
        {showModal && (
          <Modal
            largeImageURL={largeImageURL}
            onClose={this.handleCloseModal}
          />
        )}
      </div>
    );
  }
}
