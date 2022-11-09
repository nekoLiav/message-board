import styled from 'styled-components';

export const Div = styled.div`
  width: 100%;
  height: 100%;
  color: ${(props) => props.theme.fg};
  background: ${(props) => props.theme.bg};
`;
