import styled from 'styled-components';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const createText = (Component: React.ElementType, props: Props) => (
  <Component {...props} />
);

const StyledFGText = styled.p`
  color: ${(props) => props.theme.fg};
`;

const StyledFG2Text = styled.p`
  color: ${(props) => props.theme.fg2};
`;

const StyledProfileName = styled(StyledFGText)`
  font-weight: bold;
  text-decoration: none;
  white-space: nowrap;
  overflow: hidden;
  align-self: center;
  grid-area: 8 / 2 / 9 / 8;
`;

const StyledProfileHandle = styled(StyledFG2Text)`
  grid-area: 9 / 2/ 10 / 4;
`;

const StyledProfileJoined = styled(StyledFG2Text)`
  font-size: 0.875rem;
  font-weight: bold;
  grid-area: 10 / 2 / 11 / 5;
`;

const StyledProfileBlurb = styled(StyledFGText)`
  font-size: 0.875rem;
  margin-left: 1rem;
  align-self: center;
  grid-area: 11 / 1 / 14 / 6;
`;

const StyledProfileFollowerCount = styled.p`
  font-size: 0.75rem;
  font-weight: bold;
  justify-self: center;
  grid-area: 11 / 7 / 12 / 8;
`;

const StyledProfileFollowingCount = styled.p`
  font-size: 0.75rem;
  font-weight: bold;
  justify-self: center;
  grid-area: 12 / 7 / 13 / 8;
`;

const StyledProfilePostCount = styled.p`
  font-size: 0.75rem;
  font-weight: bold;
  justify-self: center;
  grid-area: 13 / 7 / 14 / 8;
`;

export const ProfileName = (props: Props) =>
  createText(StyledProfileName, props);

export const ProfileHandle = (props: Props) =>
  createText(StyledProfileHandle, props);

export const ProfileJoined = (props: Props) =>
  createText(StyledProfileJoined, props);

export const ProfileBlurb = (props: Props) =>
  createText(StyledProfileBlurb, props);

export const ProfileFollowerCount = (props: Props) =>
  createText(StyledProfileFollowerCount, props);

export const ProfileFollowingCount = (props: Props) =>
  createText(StyledProfileFollowingCount, props);

export const ProfilePostCount = (props: Props) =>
  createText(StyledProfilePostCount, props);
