import styled from 'styled-components';
import { Container } from 'components/Elements/Container';
import { Button } from 'components/Elements/Button';

export const UserContainer = styled(Container)``;

export const ProfileContainer = styled(Container)`
  display: grid;
  border-bottom-width: 1px;
  grid-template-rows: 1fr 1fr 1fr 1fr min-content;
  grid-template-columns: min-content 1fr 1fr 1fr;
`;

export const Banner = styled.div<{ profileColor: string }>`
  background: ${(props) => props.profileColor};
  grid-area: 1 / 1 / 3 / 5;
`;

export const Avatar = styled.img`
  height: 9rem;
  width: 9rem;
  border: 2px solid grey;
  border-radius: 100%;
  align-self: center;
  grid-area: 2 / 1 / 4 / 2;
  margin-left: 0.5rem;

  @media (max-width: 500px) {
    height: 4.5rem;
    width: 4.5rem;
  }
`;

export const Info = styled.div`
  margin-top: 0.5rem;
  margin-left: 0.5rem;
  grid-area: 3 / 2 / 4 / 5;
`;

export const Name = styled.p`
  font-weight: ${(props) => props.theme.heavy};
  text-decoration: none;
  white-space: nowrap;
  overflow: hidden;

  @media (max-width: 500px) {
    font-size: ${(props) => props.theme.sm};
  }
`;

export const Handle = styled.p`
  color: ${(props) => props.theme.secondary};

  @media (max-width: 500px) {
    font-size: ${(props) => props.theme.sm};
  }
`;

export const Joined = styled.p`
  font-size: ${(props) => props.theme.sm};
  color: ${(props) => props.theme.secondary};

  @media (max-width: 500px) {
    font-size: ${(props) => props.theme.xs};
  }
`;

export const Blurb = styled.p`
  font-size: ${(props) => props.theme.sm};
  margin-top: 0.5rem;
  margin-left: 0.5rem;
  grid-area: 4 / 2 / 4 / 5;

  @media (max-width: 500px) {
    font-size: ${(props) => props.theme.xs};
  }
`;

export const Engagement = styled.div`
  display: flex;
  justify-content: space-evenly;
  grid-area: 5 / 1 / 6 / 5;
`;

export const FollowerCount = styled.p`
  font-size: ${(props) => props.theme.xs};
  font-weight: ${(props) => props.theme.heavy};
  color: ${(props) => props.theme.secondary};
`;

export const FollowingCount = styled.p`
  font-size: ${(props) => props.theme.xs};
  font-weight: ${(props) => props.theme.heavy};
  color: ${(props) => props.theme.secondary};
`;

export const PostCount = styled.p`
  font-size: ${(props) => props.theme.xs};
  font-weight: ${(props) => props.theme.heavy};
  color: ${(props) => props.theme.secondary};
`;

export const FollowButton = styled(Button)`
  justify-self: center;
  align-self: end;
  grid-area: 3 / 4 / 4 / 5;

  @media (max-width: 500px) {
    font-size: ${(props) => props.theme.sm};
    width: 4rem;
    height: 1.25rem;
  }
`;

export const MessageButton = styled(Button)`
  width: 4rem;
  justify-self: center;
  align-self: center;
  margin-left: 0.5rem;
  grid-area: 4 / 1 / 5 / 2;

  @media (max-width: 500px) {
    font-size: ${(props) => props.theme.sm};
    width: 2.5rem;
    height: 1.25rem;
  }
`;
