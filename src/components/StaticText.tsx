import styled from 'styled-components';
import { ReactNode } from 'react';

type Props = {
  // profile_color: string;
  // avatar: string;
  // name: string;
  // handle: string;
  // blurb: string;
  // follower_count: number;
  // following_count: number;
  // post_count: number;
  // birthday: number;
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
  grid-column-start: 2;
  grid-column-end: 8;
  grid-row-start: 8;
  grid-row-end: 9;
`;

const StyledProfileHandle = styled(StyledFG2Text)`
  grid-column-start: 2;
  grid-column-end: 4;
  grid-row-start: 9;
  grid-row-end: 10;
`;

const StyledProfileJoined = styled(StyledFG2Text)`
  font-size: 0.875rem;
  font-weight: bold;
  grid-column-start: 2;
  grid-column-end: 5;
  grid-row-start: 10;
  grid-row-end: 11;
`;

const StyledProfileBlurb = styled(StyledFGText)`
  font-size: 0.875rem;
  margin-left: 1rem;
  align-self: center;
  grid-row-start: 11;
  grid-row-end: 14;
  grid-column-start: 1;
  grid-column-end: 6;
`;

const StyledProfileFollowerCount = styled.p`
  font-size: 0.75rem;
  font-weight: bold;
  justify-self: center;
  grid-column-start: 7;
  grid-column-end: 8;
  grid-row-start: 11;
  grid-row-end: 12;
`;

const StyledProfileFollowingCount = styled.p`
  font-size: 0.75rem;
  font-weight: bold;
  justify-self: center;
  grid-column-start: 7;
  grid-column-end: 8;
  grid-row-start: 12;
  grid-row-end: 13;
`;

const StyledProfilePostCount = styled.p`
  font-size: 0.75rem;
  font-weight: bold;
  justify-self: center;
  grid-column-start: 7;
  grid-column-end: 8;
  grid-row-start: 13;
  grid-row-end: 14;
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
