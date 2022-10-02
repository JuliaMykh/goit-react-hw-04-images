import PropTypes from 'prop-types';
import React from 'react';

import { Overlay, ModalDiv } from './Modal.styled';

export const Modal = ({ image, tags="Image", onClose }) => {

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
    tags: PropTypes.string.isRequired,
}
