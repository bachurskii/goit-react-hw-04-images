import React from 'react';
import PropTypes from 'prop-types';
import styles from './imageitem.module.css';

const ImageGalleryItem = ({ image, onClick }) => {
  const handleClick = () => {
    onClick(image.largeImageURL);
  };

  return (
    <li className={styles.galleryItem} onClick={handleClick}>
      <img
        className={styles.imageGalleryItem}
        src={image.webformatURL}
        alt=""
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
