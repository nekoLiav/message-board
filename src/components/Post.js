import styled from 'styled-components';
import NubButtons from './NubButtons';
import ThreadButtons from './ThreadButtons';
import PropTypes from 'prop-types';
import { formatDistanceToNowStrict } from 'date-fns';
import { Link } from 'react-router-dom';

const StyledPost = styled.div`
  display: flex;
  color: white;
  padding: 0.5rem;
  width: 100%;
`;

const Thread = styled.div`
  width: 100%;
`;

const ThreadTitle = styled.p`
  color: white;
  padding: 0.2rem;
  width: 100%;
  font-weight: bold;
  cursor: pointer;
`;

const ThreadInfo = styled.div`
  display: flex;
  color: white;
  font-size: 0.7rem;
  padding: 0.2rem;
`;

const StyledA = styled.a`
  color: white;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Post = (props) => {
  const postData = props.post;
  const formattedTime = formatDistanceToNowStrict(
    postData.metadata['time-posted']
  );
  return (
    <StyledPost>
      <NubButtons nubs={postData.nubs.up - postData.nubs.down} />
      <Thread>
        <ThreadTitle>{postData.content.title}</ThreadTitle>
        <ThreadInfo>
          submitted&nbsp;
          <StyledA>{formattedTime}</StyledA>
          &nbsp;ago by&nbsp;
          <StyledA>{postData.metadata.author}</StyledA>
          &nbsp;in&nbsp;
          <StyledLink
            to={`n/${postData.subnublet}`}
          >{`n/${postData.subnublet}`}</StyledLink>
        </ThreadInfo>
        <ThreadButtons comments={postData.comments} />
      </Thread>
    </StyledPost>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    metadata: PropTypes.shape({
      author: PropTypes.string,
      ['time-posted']: PropTypes.number,
    }),
    content: PropTypes.shape({
      title: PropTypes.string,
      body: PropTypes.string,
    }),
    nubs: PropTypes.shape({
      up: PropTypes.number,
      down: PropTypes.number,
    }),
    comments: PropTypes.number,
    subnublet: PropTypes.string,
  }),
};

export default Post;
