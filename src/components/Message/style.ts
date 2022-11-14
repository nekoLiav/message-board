import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const MessageContainer = styled.div<{ chain?: boolean }>`
  display: grid;
  color: ${(props) => props.theme.primary};
  background: ${(props) => props.theme.bg_darkest};
  border-color: ${(props) => props.theme.secondary};
  border-style: solid;
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

export const DateMessaged = styled.p`
  align-self: center;
  color: ${(props) => props.theme.secondary};
  font-size: 0.875rem;
`;

export const Content = styled.div`
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
