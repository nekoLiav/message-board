import styled from 'styled-components';
import React, { ReactNode } from 'react';

type Props = {
  onClick?: () => void;
  isLoading?: boolean;
  type?: string;
  children: ReactNode;
};

const createButton = (Component: React.ElementType, props: Props) => (
  <Component {...props} />
);

const StyledButton = styled.button`
  color: black;
  background: ${(props) => props.theme.btnbg};
  border: none;
  font-size: 1.125rem;
  font-weight: bold;
  transition: 0.2s;
  height: 2rem;
  width: 6rem;
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
  align-self: center;
  margin: 0 1rem;
  grid-area: 9 / 7 / 11 / 8;
`;

const StyledMessageButton = styled(StyledButton)`
  width: 3rem;
  justify-self: center;
  align-self: center;
  grid-area: 9 / 6 / 11 / 7;
`;

export const Button = (props: Props) => createButton(StyledButton, props);

export const PostSubmissionButton = (props: Props) =>
  createButton(StyledPostSubmissionButton, props);

export const FollowButton = (props: Props) =>
  createButton(StyledFollowButton, props);

export const MessageButton = (props: Props) =>
  createButton(StyledMessageButton, props);
