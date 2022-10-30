import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

const StyledSidebar = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
`;

const CreatePostLink = styled(Link)`
  color: white;

  &:hover {
    background: #666666;
  }
`;

const Sidebar = () => {
  const location = useLocation();
  const viewSring = location.pathname.slice(3);
  const generalViews = ['/', 'n/all'];
  const generalViewBool = generalViews.includes(location.pathname);
  return (
    <StyledSidebar>
      <CreatePostLink state={{ pathname: location.pathname }} to="/create-post">
        New Post {generalViewBool ? null : ` in n/${viewSring}`}
      </CreatePostLink>
    </StyledSidebar>
  );
};

export default Sidebar;
