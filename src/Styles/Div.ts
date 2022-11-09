import styled from 'styled-components';

export const Div = styled.div`
  color: ${(props) => props.theme.fg};
  background: ${(props) => props.theme.bg};
  border-color: grey;
  border-style: solid;
`;
