import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledPostEngagement = styled.div`
  display: grid;
  grid-auto-flow: column;
  font-size: 0.8rem;
`;

const Replies = styled.div`
  display: flex;

  &:hover {
    color: #00ffff;
  }
`;

const RepliesIcon = styled.p`
  font-weight: bold;
  font-size: 0.75rem;
`;

const RepliesCount = styled.p`
  font-weight: bold;
  font-size: 0.75rem;
`;

const Reposts = styled.div`
  display: flex;

  &:hover {
    color: #00ff00;
  }
`;

const RepostsIcon = styled.p`
  font-weight: bold;
  font-size: 0.75rem;
`;

const RepostsCount = styled.p`
  font-weight: bold;
  font-size: 0.75rem;
`;

const Likes = styled.div`
  display: flex;

  &:hover {
    color: #ff00ff;
  }
`;

const LikesIcon = styled.p`
  font-weight: bold;
  font-size: 0.75rem;
`;

const LikesCount = styled.p`
  font-weight: bold;
  font-size: 0.75rem;
`;

const PostEngagement = (props) => {
  return (
    <StyledPostEngagement>
      <Replies>
        <RepliesIcon>Replies:&nbsp;</RepliesIcon>
        <RepliesCount>{props.replies}</RepliesCount>
      </Replies>
      <Reposts>
        <RepostsIcon>Reposts:&nbsp;</RepostsIcon>
        <RepostsCount>{props.reposts}</RepostsCount>
      </Reposts>
      <Likes>
        <LikesIcon>Likes:&nbsp;</LikesIcon>
        <LikesCount>{props.likes}</LikesCount>
      </Likes>
    </StyledPostEngagement>
  );
};

PostEngagement.propTypes = {
  replies: PropTypes.number,
  reposts: PropTypes.number,
  likes: PropTypes.number,
};

export default PostEngagement;
