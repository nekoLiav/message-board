import { ReactNode, SyntheticEvent } from 'react';
import styled from 'styled-components';

type Props = {
  main?: boolean;
  chain?: boolean;
  onClick?: (e: SyntheticEvent) => void;
  children: ReactNode;
};

const createContainer = (Component: React.ElementType, props: Props) => {
  const { children, ...rest } = props;
  return <Component {...rest}>{children}</Component>;
};

const StyledContainer = styled.div<{ chain: boolean; main: boolean }>`
  color: ${(props) => props.theme.primary};
  background: ${(props) => props.theme.bg_darkest};
  border-color: ${(props) => props.theme.secondary};
  border-style: solid;
`;

const StyledHeaderContainer = styled(StyledContainer)`
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

const StyledAsideContainer = styled(StyledContainer)`
  @media (max-width: 350px) {
    display: none;
  }
`;

const StyledLinkContainer = styled(StyledContainer)`
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

const StyledProfileContainer = styled(StyledContainer)`
  display: grid;
  grid-template-columns: min-content repeat(5, minmax(min-content, 1fr)) min-content;
  grid-template-rows: repeat(13, minmax(1rem, 1.5rem));
`;

const StyledPostContainer = styled(StyledContainer)`
  display: grid;
  grid-template-columns: min-content repeat(4, minmax(min-content, 1fr)) 0.5rem;
  grid-template-rows: repeat(2, 1rem) 1.5rem 1fr 1.5rem;
  background: ${(props) =>
    props.main ? props.theme.mo : props.theme.bg_darkest};
  border-bottom-width: ${(props) => (props.chain ? '0' : '1px')};
  transition: 0.2s;

  &:hover {
    background: ${(props) => (props.main ? props.theme.mo2 : props.theme.mo)};
    cursor: pointer;
  }
`;

const StyledMessageContainer = styled(StyledContainer)`
  display: grid;
  grid-template-columns: min-content repeat(4, minmax(min-content, 1fr)) 0.5rem;
  grid-template-rows: repeat(2, 1rem) 1.5rem 1fr 1.5rem;
  background: ${(props) => props.theme.bg};
  border-bottom-width: ${(props) => (props.chain ? '0' : '1px')};
  transition: 0.2s;

  &:hover {
    background: ${(props) => props.theme.main};
    cursor: pointer;
  }
`;

const StyledSubmissionContainer = styled(StyledContainer)`
  display: flex;
  padding: 0.5rem;
  gap: 0.5rem;
`;

const StyledAppContainer = styled(StyledContainer)`
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

const StyledRouteContainer = styled(StyledContainer)`
  border-width: 0 1px 0 1px;
`;

export const HeaderContainer = (props: Props) =>
  createContainer(StyledHeaderContainer, props);

export const AsideContainer = (props: Props) =>
  createContainer(StyledAsideContainer, props);

export const LinkContainer = (props: Props) =>
  createContainer(StyledLinkContainer, props);

export const ProfileContainer = (props: Props) =>
  createContainer(StyledProfileContainer, props);

export const PostContainer = (props: Props) =>
  createContainer(StyledMessageContainer, props);

export const MessageContainer = (props: Props) =>
  createContainer(StyledPostContainer, props);

export const SubmissionContainer = (props: Props) =>
  createContainer(StyledSubmissionContainer, props);

export const AppContainer = (props: Props) =>
  createContainer(StyledAppContainer, props);

export const RouteContainer = (props: Props) =>
  createContainer(StyledRouteContainer, props);
