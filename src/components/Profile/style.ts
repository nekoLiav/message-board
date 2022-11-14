import styled from 'styled-components';
import { Container } from '../../container/style';
import { Button } from '../button/style';

export const ProfileContainer = styled(Container)`
  display: grid;
  border-bottom-width: 1px;
  grid-template-columns: min-content repeat(5, minmax(min-content, 1fr)) min-content;
  grid-template-rows: repeat(13, minmax(1rem, 1.5rem));
`;

export const FollowButton = styled(Button)`
  align-self: center;
  margin: 0 1rem;
  grid-area: 9 / 7 / 11 / 8;
`;

export const MessageButton = styled(Button)`
  width: 3rem;
  justify-self: center;
  align-self: center;
  grid-area: 9 / 6 / 11 / 7;
`;

export const Banner = styled.div<{ profileColor: string }>`
  background: ${(props) => props.profileColor};
  grid-area: 2 / 1 / 8 / 8;
`;

export const Avatar = styled.img`
  max-height: 3rem;
  max-width: 3rem;
  max-height: 9rem;
  max-width: 9rem;
  border: 2px solid grey;
  border-radius: 100%;
  margin: 0 1rem;
  grid-area: 5 / 1 / 10 / 2;
`;

export const Name = styled.p`
  font-weight: ${(props) => props.theme.heavy};
  text-decoration: none;
  white-space: nowrap;
  overflow: hidden;
  align-self: center;
  grid-area: 8 / 2 / 9 / 8;
`;

export const Handle = styled.p`
  grid-area: 9 / 2/ 10 / 4;
`;

export const Joined = styled.p`
  font-size: ${(props) => props.theme.sm};
  font-weight: ${(props) => props.theme.heavy};
  grid-area: 10 / 2 / 11 / 5;
`;

export const Blurb = styled.p`
  font-size: ${(props) => props.theme.sm};
  margin-left: 1rem;
  align-self: center;
  grid-area: 11 / 1 / 14 / 6;
`;

export const FollowerCount = styled.p`
  font-size: ${(props) => props.theme.xs};
  font-weight: ${(props) => props.theme.heavy};
  justify-self: center;
  grid-area: 11 / 7 / 12 / 8;
`;

export const FollowingCount = styled.p`
  font-size: ${(props) => props.theme.xs};
  font-weight: ${(props) => props.theme.heavy};
  justify-self: center;
  grid-area: 12 / 7 / 13 / 8;
`;

export const PostCount = styled.p`
  font-size: ${(props) => props.theme.xs};
  font-weight: ${(props) => props.theme.heavy};
  justify-self: center;
  grid-area: 13 / 7 / 14 / 8;
`;
