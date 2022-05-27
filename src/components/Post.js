import styled from 'styled-components';
import NubButtons from './NubButtons';
import ThreadButtons from './ThreadButtons';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns/esm';

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
        <StyledThreadTitle>{postData.title}</StyledThreadTitle>
        <StyledThreadInfo>{`submitted ${formatDistanceToNow(
          postData.time
        )} ago by ${postData.user} in n/${postData.subnub}`}</StyledThreadInfo>
        <ThreadButtons />
      </StyledThread>
    </StyledPost>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    subnub: PropTypes.string,
    user: PropTypes.string,
    time: PropTypes.number,
    title: PropTypes.string,
  }),
};

export default Post;
