import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Container } from 'components/Container';
import { Button } from 'components/Button';

export const ContentSubmissionContainer = styled(Container)`
  display: grid;
  grid-template-columns: min-content 1fr;
  grid-template-rows: min-content 1fr;
  padding: 0.5rem;
  border-bottom-width: 1px;
  position: relative;
`;

export const AvatarLink = styled(Link)`
  max-width: 3rem;
  max-height: 3rem;
  grid-area: 1 / 1 / 2 / 2;
`;

export const Avatar = styled.img`
  display: block;
  max-width: 3rem;
  max-height: 3rem;
  border-radius: 100%;
`;

export const ContentSubmissionForm = styled.form`
  display: grid;
  width: 100%;
  height: 100%;
  padding-left: 0.5rem;
  grid-template-columns: 1fr min-content;
  grid-template-rows: 1fr min-content;
  grid-area: 1 / 2 / 3 / 3;
`;

export const BodyField = styled.textarea`
  color: ${(props) => props.theme.primary};
  background: ${(props) => props.theme.bg_darkest};
  font-size: 1rem;
  resize: none;
  border: none;
  font-family: 'Roboto';
  width: 100%;
  height: 100%;
  min-height: 5rem;
  grid-area: 1 / 1 / 2 / 3;

  &:focus {
    outline: none;
  }

  @media (max-width: 360px) {
    font-size: 0.825rem;
  }
`;

export const ImgField = styled.input`
  color: ${(props) => props.theme.primary};
  background: ${(props) => props.theme.bg_darkest};
  font-size: 1rem;
  resize: none;
  border: none;
  font-family: 'Roboto';
  grid-area: 2 / 1 / 3 / 2;

  &:focus {
    outline: none;
  }

  @media (max-width: 360px) {
    font-size: 0.825rem;
  }
`;

export const ContentSubmissionButton = styled(Button)`
  grid-area: 3 / 2 / 4 / 3;

  @media (max-width: 360px) {
    height: 1.5rem;
    width: 4.5rem;
  }
`;

export const Attachments = styled.div`
  display: flex;
  align-items: end;
  grid-area: 3 / 1 / 4 / 3;
`;

export const ImageAttachment = styled.div`
  color: ${(props) => props.theme.y};
  height: min-content;
  width: min-content;
  border-radius: 5px;

  &:hover {
    cursor: pointer;
    filter: brightness(90%);
  }

  &:active {
    filter: brightness(80%);
  }
`;
