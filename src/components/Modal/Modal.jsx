import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { Overlay, ModalDiv, Button } from './Modal.styled';

// const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ image, tags, onClose }) => {

  const handleClickByEscape = e => {
    if (e.code === 'Escape') {
      onClose();
      window.removeEventListener('keydown', handleClickByEscape);
    }
  };

  const handleClickOnBackdrop = e => {
    if (e.currentTarget === e.target) {
      onClose();
      window.removeEventListener('keydown', handleClickByEscape);
    }
  };

  window.addEventListener('keydown', handleClickByEscape);

    return (
      <Overlay onClick={handleClickOnBackdrop}>
        <ModalDiv >
          
            {/* <Button type="button" onClick={onClose}>Close</Button> */}
         
          <img
            src={image}
            alt={tags}
            loading="lazy"
          />
        </ModalDiv>
      </Overlay>
   );
};


Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    image: PropTypes.string.isRequired,
    tags: PropTypes.string,
}
