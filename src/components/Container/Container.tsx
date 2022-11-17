import styled from 'styled-components';

export const Container = styled.div<{ chain?: boolean; main?: boolean }>`
  color: ${(props) => props.theme.primary};
  background: ${(props) => props.theme.bg_darkest};
  border-color: ${(props) => props.theme.secondary};
  border-style: solid;
`;
