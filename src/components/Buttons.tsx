import styled from 'styled-components';
import React, { ReactNode } from 'react';

type Props = {
  onClick?: () => void;
  small?: boolean;
  isLoading?: boolean;
  type?: string;
  children: ReactNode;
};

const createButton = (Component: React.ElementType, props: Props) => (
  <Component {...props} />
);

const StyledButton = styled.button<{ small: boolean }>`
  color: black;
  background: ${(props) => props.theme.btnbg};
  border: none;
  font-size: 1.125rem;
  font-weight: bold;
  transition: 0.2s;
  height: 2rem;
  width: ${(props) => (props.small ? '3rem' : '6rem')};
  border-radius: 15px;

  &:hover {
    cursor: pointer;
    filter: brightness(90%);
  }

  &:active {
    filter: brightness(80%);
  }

  @media (max-width: 360px) {
    font-size: 0.825rem;
  }
`;

const StyledPostSubmissionButton = styled(StyledButton)`
  align-self: end;
`;

const StyledFollowButton = styled(StyledButton)`
  grid-column-start: 7;
  grid-column-end: 8;
  grid-row-start: 9;
  grid-row-end: 11;
  margin: 0 1rem;
  align-self: center;
`;

const StyledMessageButton = styled(StyledButton)`
  grid-column-start: 6;
  grid-column-end: 7;
  grid-row-start: 9;
  grid-row-end: 11;
  align-self: center;
  justify-self: center;
`;

export const Button = (props: Props) => createButton(StyledButton, props);

export const PostSubmissionButton = (props: Props) =>
  createButton(StyledPostSubmissionButton, props);

export const FollowButton = (props: Props) =>
  createButton(StyledFollowButton, props);

export const MessageButton = (props: Props) =>
  createButton(StyledMessageButton, props);
