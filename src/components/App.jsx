import React, { useState, useCallback, useEffect } from 'react';
import GetImages from './Api/Api';
import Searchbar from './searchbar/Searshbar';
import Modal from './modal/Modal';
import ImageGallery from './imagegalery/ImageGallery';
import Button from './button/Button';
import Loader from './loader/Loader';
import styles from './App.module.css';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSearchSubmit = query => {
    setSearchQuery(query);
    setImages([]);
    setPage(1);
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

  const getImages = useCallback(async (query, page) => {
    setIsLoading(true);
    const newImages = await GetImages(query, page);
    setImages(prevImages => [...prevImages, ...newImages]);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') return;

    getImages(searchQuery, page);
  }, [getImages, page, searchQuery]);

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

export default App;
