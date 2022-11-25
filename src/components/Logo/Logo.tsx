import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ReactComponent as Icon } from 'assets/test.svg';

export const LogoLink = styled(Link)`
  position: sticky;
  top: 0;
  width: 2.5rem;
  height: 2.5rem;
  margin-bottom: 0.5rem;

  @media (max-width: 650px) {
    width: 1.5rem;
    height: 1.5rem;
    align-self: center;
  }

  @media (max-width: 360px) {
    flex-direction: row;
    margin: 0;
    margin-right: auto;
  }
`;

export const Logo = styled(Icon)`
  display: block;
  position: sticky;
  top: 0;
  width: 2.5rem;
  height: 2.5rem;
  margin-bottom: 0.5rem;

  @media (max-width: 650px) {
    width: 1.5rem;
    height: 1.5rem;
    align-self: center;
  }

  @media (max-width: 360px) {
    flex-direction: row;
    margin: 0;
    margin-right: auto;
  }
`;
