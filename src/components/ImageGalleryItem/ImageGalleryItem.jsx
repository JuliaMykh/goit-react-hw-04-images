
import React, { useState } from 'react';
import PropTypes from "prop-types";

import { ImageGalleryLi, ImageGalleryItemImg } from './ImageGalleryItem.styled';
import { Modal } from "components/Modal/Modal";

export const ImageGalleryItem = ({ webformatURL, tags="Image", largeImageURL}) => {
    const [showModal, setShowModal] = useState(false);

    const togglenModal = () => {
    setShowModal(!showModal);
  };

    return (
        <>
        <ImageGalleryLi onClick={togglenModal}>
            <ImageGalleryItemImg src={webformatURL} alt={tags} data-large={largeImageURL} />
        </ImageGalleryLi>

         {showModal && (
        <Modal image={largeImageURL} tags={tags} onClose={togglenModal} />
      )}
        </>
    )
};

ImageGalleryItem.propTypes = {
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    
};

