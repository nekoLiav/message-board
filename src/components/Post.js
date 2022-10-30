/* eslint-disable no-unused-vars */
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { formatDistanceToNowStrict } from 'date-fns';
import { Link } from 'react-router-dom';

const StyledPost = styled.div`
  display: flex;
  color: white;
  width: 100%;
  padding: 0.3rem 0;
  border: 1px solid grey;

  &:hover {
    background: #333333;
  }
`;

const Thread = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`;

const ThreadTitle = styled(Link)`
  color: white;
  width: max-content;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
`;

const ThreadInfo = styled.div`
  display: flex;
  color: white;
  font-size: 0.7rem;
`;

const StyledA = styled.a`
  color: white;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #99ccff;

  &:visited {
    color: #99ccff;
  }

  &:hover {
    text-decoration: underline;
  }
`;

const ThreadButtons = styled.div`
  display: flex;
`;

const ThreadButton = styled(Link)`
  font-size: 0.7rem;
  font-weight: bold;
  text-decoration: none;
  color: white;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const Post = (props) => {
  return <StyledPost></StyledPost>;
};

Post.propTypes = {
  post: PropTypes.shape({
    metadata: PropTypes.shape({
      author: PropTypes.string,
      created: PropTypes.number,
    }),
    content: PropTypes.shape({
      title: PropTypes.string,
      body: PropTypes.string,
    }),
    comments: PropTypes.number,
    subnublet: PropTypes.string,
    id: PropTypes.string,
  }),
};

export default Post;
