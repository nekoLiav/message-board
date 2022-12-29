/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createPortal } from 'react-dom';
import { StyledModal, ModalBackground } from './style';

type ModalProps = {
  children: React.ReactNode;
};

const Modal = (props: ModalProps) => {
  const portalRoot = document.getElementById('portal-root');

  const { children } = props;

  return createPortal(
    <ModalBackground>
      <StyledModal>{children}</StyledModal>
    </ModalBackground>,
    portalRoot!
  );
};

export default Modal;
