import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Container } from '@/components/Elements/Container';
import { Button } from '@/components/Elements/Button';

export const ContentSubmissionContainer = styled(Container)`
  display: flex;
  padding: 0.5rem;
  gap: 0.5rem;
  border-bottom-width: 1px;
`;

export const ContentSubmissionButton = styled(Button)`
  align-self: end;

  @media (max-width: 360px) {
    height: 1.5rem;
    width: 4.5rem;
  }
`;

export const AvatarLink = styled(Link)`
  max-width: 3rem;
  max-height: 3rem;
`;

export const Avatar = styled.img`
  display: block;
  max-width: 3rem;
  max-height: 3rem;
  border-radius: 100%;
`;

export const ContentSubmissionForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 0.5rem;
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
  padding: 0.5rem;
  min-height: 5rem;

  &:focus {
    outline: none;
  }

  @media (max-width: 360px) {
    font-size: 0.825rem;
  }
`;
