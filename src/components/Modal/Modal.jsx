import { createPortal } from 'react-dom';
import { useEffect } from 'react';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ closeModal, modalImage }) => {
  useEffect(() => {
    const closeByEsc = e => {
      if (e.code === 'Escape') {
        return closeModal();
      }
    };

    window.addEventListener('keydown', closeByEsc);
    return () => {
      window.removeEventListener('keydown', closeByEsc);
    };
  }, [closeModal]);

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      return closeModal();
    }
  };

  return createPortal(
    <div className="Overlay" onClick={handleBackdropClick}>
      <div className="Modal">
        <img src={modalImage} alt="" />
      </div>
    </div>,
    modalRoot
  );
};
