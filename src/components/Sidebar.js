import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

const StyledSidebar = styled.div`
  bored: 1px solid white;
  width: 25rem;
  height: 100%;
  background: #333333;
`;

const Sidebar = () => {
  const location = useLocation();
  console.log(location);
  return <StyledSidebar></StyledSidebar>;
};

export default Sidebar;
