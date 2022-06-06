import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

const StyledSidebar = styled.div`
  display: flex;
  flex-direction: column;
  width: 25rem;
  height: 100%;
  gap: 1rem;
  padding: 1rem 0.5rem 0 0.5rem;
`;

const CreatePostLink = styled(Link)`
  text-decoration: none;
  color: white;
  padding: 0.5rem;
  text-align: center;
  font-weight: bold;
  background: #444444;

  &:hover {
    background: #666666;
  }
`;

const CreateSubnubletLink = styled(Link)`
  text-decoration: none;
  color: white;
  padding: 0.5rem;
  text-align: center;
  font-weight: bold;
  background: #444444;

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
      {generalViewBool ? (
        <CreateSubnubletLink to="create-subnublet">
          New Community
        </CreateSubnubletLink>
      ) : null}
    </StyledSidebar>
  );
};

export default Sidebar;
