import styled from 'styled-components';
import { Container } from 'components/Container';

export const SidebarContainer = styled(Container)`
  @media (max-width: 350px) {
    display: none;
  }
`;