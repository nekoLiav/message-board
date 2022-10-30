import styled from 'styled-components';
import PropTypes from 'prop-types';
import { formatDistanceToNowStrict } from 'date-fns';
// import { Link } from 'react-router-dom';

const StyledPost = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  width: 100%;
  height: max-content;
  border: 1px solid grey;

  &:hover {
    background: #333333;
  }
`;

const Info = styled.div`
  color: white;
`;

const Body = styled.p`
  color: white;
  padding: 5px 0;
`;

const Post = (props) => {
  const body = props.post.body;
  const created = formatDistanceToNowStrict(props.post.created);
  const createdString = `${created.split(' ')[0]}${created.split(' ')[1][0]}`;
  const by = props.post.by;
  return (
    <StyledPost>
      <Info>{`${by} - ${createdString}`}</Info>
      <Body>{body}</Body>
    </StyledPost>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    body: PropTypes.string,
    created: PropTypes.number,
    by: PropTypes.string,
  }),
};

export default Post;
