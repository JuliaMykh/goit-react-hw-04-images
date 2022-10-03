import PropTypes from 'prop-types';
import React, {useEffect} from 'react';

import { Overlay, ModalDiv } from './Modal.styled';

export const Modal = ({ image, tags="Image", onClose }) => {

  useEffect(() => {
    window.addEventListener('keydown', handleClickByEscape);
    return () => window.removeEventListener('keydown', handleClickByEscape);
  });

  const handleClickByEscape = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleClickOnBackdrop = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

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
