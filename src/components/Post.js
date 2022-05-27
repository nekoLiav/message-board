import styled from 'styled-components';
import NubButtons from './NubButtons';
import ThreadButtons from './ThreadButtons';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns/esm';

const StyledPost = styled.div`
  display: flex;
  color: white;
  border: 1px solid white;
  padding: 1rem;
  width: 100%;
`;

const StyledThread = styled.div`
  width: 100%;
  border: 1px solid white;
`;

const StyledThreadTitle = styled.p`
  color: white;
  border: 1px solid white;
  padding: 1rem;
  width: 100%;
`;

const StyledThreadInfo = styled.div`
  display: flex;
  color: white;
`;

const Post = (props) => {
  return (
    <StyledPost>
      <NubButtons />
      <StyledThread>
        <StyledThreadTitle>{props.title}</StyledThreadTitle>
        <StyledThreadInfo>{`submitted ${formatDistanceToNow(
          props.time
        )} ago by ${props.user} in n/ps5`}</StyledThreadInfo>
        <ThreadButtons />
      </StyledThread>
    </StyledPost>
  );
};

Post.propTypes = {
  title: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
  user: PropTypes.string.isRequired,
};

export default Post;
