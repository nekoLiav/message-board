/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createPortal } from 'react-dom';
import { StyledModal, ModalBackground } from './style';

const Modal = () => {
  const anchor = document.getElementById('attachment-modal-anchor');

  return createPortal(
    <ModalBackground>
      <StyledModal></StyledModal>
    </ModalBackground>,
    anchor!
  );
};

export default Modal;
