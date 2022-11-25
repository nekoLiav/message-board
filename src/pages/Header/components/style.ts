import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Container } from 'components/Container';

export const HeaderContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
  height: 100%;
  padding: 0.5rem;

  @media (max-width: 360px) {
    border-width: 0 0 1px 0;
  }
`;

export const LinkContainer = styled(Container)`
  display: flex;
  flex-direction: column;

  @media (max-width: 650px) {
    align-items: center;
  }

  @media (max-width: 360px) {
    flex-direction: row;
    align-items: center;
    width: 100%;
  }
`;

export const HeaderLink = styled(Link)`
  color: ${(props) => props.theme.primary};
  text-decoration: none;
  display: flex;
  gap: 0.5rem;
  font-size: 1.25rem;
  border-radius: 15px;
  padding: 0.5rem;

  @media (max-width: 650px) {
    width: min-content;
    align-self: center;
  }

  &:hover {
    background: ${(props) => props.theme.mo};
  }

  &:active {
    background: ${(props) => props.theme.mo2};
  }
`;

export const HeaderText = styled.p`
  @media (max-width: 650px) {
    display: none;
  }
`;
