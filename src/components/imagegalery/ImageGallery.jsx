import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/imageitem/ImageGalleryItem';
import styles from './imagegallery.module.css';

const ImageGallery = ({ images, onClick }) => {
  return (
    <ul className={styles.gallery}>
      {images.map(image => (
        <ImageGalleryItem key={image.id} image={image} onClick={onClick} />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGallery;
