import styled from 'styled-components';
import { Container } from 'components/Container';
import { Link } from 'react-router-dom';
import { ReactComponent as Icon } from 'assets/test.svg';

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

export const AppContainer = styled(Container)`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr minmax(min-content, 600px) 1fr;
  height: 100%;
  width: 100%;
  overflow: auto;

  @media (max-width: 360px) {
    grid-template-columns: 1fr;
    grid-template-rows: min-content 1fr;
  }
`;

export const RouteContainer = styled(Container)`
  border-width: 0 1px 0 1px;
`;

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

export const Logo = styled(Icon)``;

export const HomeLink = styled(Link)`
  display: flex;
  gap: 0.5rem;
  color: ${(props) => props.theme.primary};
  text-decoration: none;
  font-size: 1.25rem;
  border-radius: 15px;
  padding: 0.5rem;
  transition: 0.2s;
  align-items: baseline;

  &:hover {
    background: ${(props) => props.theme.mo};
  }

  &:active {
    background: ${(props) => props.theme.mo2};
  }

  @media (max-width: 650px) {
    width: min-content;
    align-self: center;
  }
`;

export const HomeLinkText = styled.p`
  @media (max-width: 650px) {
    display: none;
  }
`;

export const MessagesLink = styled(Link)`
  display: flex;
  gap: 0.5rem;
  color: ${(props) => props.theme.primary};
  text-decoration: none;
  font-size: 1.25rem;
  border-radius: 15px;
  padding: 0.5rem;
  transition: 0.2s;
  align-items: baseline;

  &:hover {
    background: ${(props) => props.theme.mo};
  }

  &:active {
    background: ${(props) => props.theme.mo2};
  }

  @media (max-width: 650px) {
    width: min-content;
    align-self: center;
  }
`;

export const MessagesLinkText = styled.p`
  @media (max-width: 650px) {
    display: none;
  }
`;

export const ProfileLink = styled(Link)`
  display: flex;
  gap: 0.5rem;
  color: ${(props) => props.theme.primary};
  text-decoration: none;
  font-size: 1.25rem;
  border-radius: 15px;
  padding: 0.5rem;
  transition: 0.2s;
  align-items: baseline;

  &:hover {
    background: ${(props) => props.theme.mo};
  }

  &:active {
    background: ${(props) => props.theme.mo2};
  }

  @media (max-width: 650px) {
    width: min-content;
    align-self: center;
  }
`;

export const ProfileLinkText = styled.p`
  @media (max-width: 650px) {
    display: none;
  }
`;
