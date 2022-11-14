import styled from 'styled-components';
import { Container } from '../../container/style';

export const AppContainer = styled(Container)`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr minmax(min-content, 600px) 1fr;
  height: 100%;
  width: 100%;
  overflow: auto;

  @media (max-width: 360px) {
    grid-template-columns: 1fr;
    grid-template-rows: min-content 1fr;
  }
`;

export const RouteContainer = styled(Container)`
  border-width: 0 1px 0 1px;
`;
