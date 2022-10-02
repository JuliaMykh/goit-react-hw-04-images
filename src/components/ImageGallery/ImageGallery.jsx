import React from "react";
import PropTypes from "prop-types";

import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryCont } from './ImageGallery.styled';

export const ImageGallery = ({images}) => {
    return (
        <ImageGalleryCont >
      {images.map(({ id, ...restProps}) => (
        <ImageGalleryItem
          key={id}
          {...restProps}
        />
      ))}
    </ImageGalleryCont>
    )
};

ImageGallery.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
};
