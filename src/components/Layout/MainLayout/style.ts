import styled from 'styled-components';
import { Container } from 'components/Container';

export const StyledMainLayout = styled(Container)`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr minmax(min-content, 600px) 1fr;
  height: 100%;
  width: 100%;
  overflow: auto;

  @media (max-width: 650px) {
    grid-template-columns: 1fr;
    grid-template-rows: min-content 1fr min-content;
  }
`;

export const RouteContainer = styled(Container)``;
