import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Container } from '../container/style';

export const PostContainer = styled(Container)`
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

export const AvatarLink = styled(Link)`
  max-width: 3rem;
  max-height: 3rem;
  margin: 0.5rem;
  grid-area: 1 / 1 / 3 / 2;
`;

export const Avatar = styled.img`
  display: block;
  max-width: 3rem;
  max-height: 3rem;
  border-radius: 100%;
`;

export const Linker = styled.div<{ chain: boolean | undefined }>`
  display: ${(props) => (props.chain ? 'block' : 'none')};
  background: ${(props) => props.theme.y};
  width: 2px;
  justify-self: center;
  margin-top: 0.5rem;
  grid-area: 4 / 1 / 6 / 2;
`;

export const Info = styled.div`
  display: flex;
  grid-area: 1 / 2 / 3 / 6;
`;

export const Name = styled(Link)`
  align-self: center;
  font-weight: bold;
  text-decoration: none;
  color: ${(props) => props.theme.primary};
  font-size: 0.875rem;

  &:hover {
    text-decoration: underline;
  }
`;

export const Handle = styled(Link)`
  align-self: center;
  color: ${(props) => props.theme.secondary};
  text-decoration: none;
  font-size: 0.875rem;

  &:hover {
    text-decoration: underline;
  }
`;

export const DatePosted = styled.p`
  align-self: center;
  color: ${(props) => props.theme.secondary};
  font-size: 0.875rem;
`;

export const Body = styled.div`
  grid-area: 3 / 2 / 5 / 6;
`;

export const Text = styled.p`
  overflow-wrap: anywhere;
  font-size: 0.875rem;
`;

export const Img = styled.img`
  display: block;
  border: 1px solid grey;
  border-radius: 15px;
  max-width: 100%;
  margin-top: 0.5rem;
`;

export const Engagement = styled.div`
  display: grid;
  grid-template-column: repeat(6, 1fr);
  grid-area: 5 / 2 / 5 / 6;
`;

export const Replies = styled.div`
  display: flex;
  grid-column: 1 / 2;
  width: min-content;
  gap: 0.5rem;
  align-items: center;
  color: ${(props) => props.theme.secondary};

  &:hover {
    color: #00ffff;
  }
`;

export const RepliesCount = styled.p`
  font-weight: bold;
  font-size: 0.75rem;
`;

export const Reposts = styled.div`
  display: flex;
  grid-column: 3 / 4;
  width: min-content;
  gap: 0.5rem;
  align-items: center;
  color: ${(props) => props.theme.secondary};

  &:hover {
    color: #00ff00;
  }
`;

export const RepostsCount = styled.p`
  font-weight: bold;
  font-size: 0.75rem;
`;

export const Likes = styled.div`
  display: flex;
  grid-column: 5 / 6;
  width: min-content;
  gap: 0.5rem;
  align-items: center;
  color: ${(props) => props.theme.secondary};

  &:hover {
    color: #ff00ff;
  }
`;

export const LikesCount = styled.p`
  font-weight: bold;
  font-size: 0.75rem;
`;
