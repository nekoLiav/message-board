import styled from 'styled-components';

export const ModalBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  top: 0;
`;

export const StyledModal = styled.div`
  background: ${(props) => props.theme.bg_darkest};
  border-color: ${(props) => props.theme.secondary};
  border-style: solid;
  border-width: 1px;
  height: 20rem;
  width: 20rem;
`;
