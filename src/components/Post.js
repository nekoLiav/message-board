import styled from 'styled-components';
import NubButtons from './NubButtons';
import ThreadButtons from './ThreadButtons';
import PropTypes from 'prop-types';
import { formatDistanceToNowStrict } from 'date-fns';

const StyledPost = styled.div`
  display: flex;
  color: white;
  border: 1px solid white;
  padding: 0.5rem;
  width: 100%;
`;

const StyledThread = styled.div`
  width: 100%;
  border: 1px solid white;
`;

const StyledThreadTitle = styled.p`
  color: white;
  border: 1px solid white;
  padding: 0.2rem;
  width: 100%;
  font-weight: bold;
`;

const StyledThreadInfo = styled.div`
  display: flex;
  color: white;
  font-size: 0.7rem;
  padding: 0.2rem;
`;

const Post = (props) => {
  const postData = props.post;
  return (
    <StyledPost>
      <NubButtons />
      <StyledThread>
        <StyledThreadTitle>{postData.content.title}</StyledThreadTitle>
        <StyledThreadInfo>{`submitted ${formatDistanceToNowStrict(
          postData.metadata['time-posted']
        )} ago by ${postData.metadata.author} in n/${
          postData.subnublet
        }`}</StyledThreadInfo>
        <ThreadButtons comments={postData.comments} />
      </StyledThread>
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
