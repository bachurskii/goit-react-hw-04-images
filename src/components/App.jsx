import React, { useState, useEffect } from 'react';
import GetImages from './Api/Api';
import Searchbar from './searchbar/Searshbar';
import Modal from './modal/Modal';
import ImageGallery from './imagegalery/ImageGallery';
import Button from './button/Button';
import Loader from './loader/Loader';
import styles from './App.module.css';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    if (!searchQuery) return;

    const getImages = async () => {
      setIsLoading(true);
      const newImages = await GetImages(searchQuery, page);
      setImages(prevImages => [...prevImages, ...newImages]);
      setIsLoading(false);
    };

    getImages();
  }, [searchQuery, page]);

  const handleSearchSubmit = query => {
    setSearchQuery(query);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleImageClick = imageURL => {
    setLargeImageURL(imageURL);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setLargeImageURL('');
    setShowModal(false);
  };

  return (
    <div className={styles.App}>
      <Searchbar onSubmit={handleSearchSubmit} />
      <ImageGallery images={images} onClick={handleImageClick} />
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && <Button onClick={handleLoadMore} />}
      {showModal && (
        <Modal largeImageURL={largeImageURL} onClose={handleCloseModal} />
      )}
    </div>
  );
};
