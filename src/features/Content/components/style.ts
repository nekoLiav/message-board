import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Container } from 'components/Container';

export const ContentContainer = styled(Container)`
  display: grid;
  grid-template-columns: 3rem repeat(4, minmax(min-content, 1fr));
  grid-template-rows: min-content 1fr 1.5rem;
  background: ${(props) =>
    props.main ? props.theme.mo : props.theme.bg_darkest};
  border-bottom-width: ${(props) => (props.chain ? '0' : '1px')};
  transition: 0.2s;
  padding-top: 0.5rem;

  &:hover {
    background: ${(props) => (props.main ? props.theme.mo2 : props.theme.mo)};
    cursor: pointer;
  }
`;

export const Info = styled.div`
  display: grid;
  grid-template-columns: repeat(2, min-content) max-content;
  gap: 0.25rem 0;
  margin-left: 0.5rem;
  grid-area: 1 / 1 / 2 / 6;
`;

export const AvatarLink = styled(Link)`
  max-width: 3rem;
  max-height: 3rem;
  grid-area: 1 / 1 / 3 / 1;
`;

export const Avatar = styled.img`
  display: block;
  max-width: 3rem;
  max-height: 3rem;
  border-radius: 100%;
`;

export const Name = styled(Link)`
  font-weight: bold;
  text-decoration: none;
  color: ${(props) => props.theme.primary};
  font-size: 0.875rem;
  align-self: end;
  margin-left: 0.5rem;
  grid-area: 1 / 2 / 2 / 4;

  &:hover {
    text-decoration: underline;
  }
`;

export const Handle = styled(Link)`
  color: ${(props) => props.theme.secondary};
  text-decoration: none;
  font-size: 0.875rem;
  margin-left: 0.5rem;
  grid-area: 2 / 2 / 3 / 2;

  &:hover {
    text-decoration: underline;
  }
`;

export const DatePosted = styled.p`
  color: ${(props) => props.theme.secondary};
  font-size: 0.875rem;
  grid-area: 2 / 3 / 3 / 3;
`;

export const Linker = styled.div<{ chain: boolean | undefined }>`
  display: ${(props) => (props.chain ? 'block' : 'none')};
  background: ${(props) => props.theme.y};
  width: 2px;
  justify-self: center;
  margin-top: 0.5rem;
  margin-left: 1rem;
  grid-area: 2 / 1 / 4 / 2;
`;

export const Body = styled.div`
  margin-left: 1rem;
  margin-right: 0.5rem;
  grid-area: 2 / 2 / 3 / 6;
`;

export const Text = styled.p`
  overflow-wrap: anywhere;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
`;

export const Img = styled.img`
  display: block;
  border: 1px solid grey;
  border-radius: 15px;
  max-width: 100%;
`;

export const Engagement = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-left: 1rem;
  grid-area: 3 / 2 / 4 / 6;
`;

export const Replies = styled.div`
  display: flex;
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
