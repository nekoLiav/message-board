import styled from 'styled-components';
import { InferProps } from 'prop-types';
import { PostType } from '../../Types/PropTypes';

const StyledPostEngagement = styled.div`
  display: flex;
  gap: 5rem;
  width: 100%;
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

const PostEngagementPropTypes = {
  post: PostType.isRequired,
};

type PostEngagementProps = InferProps<typeof PostEngagementPropTypes>;

const PostEngagement = ({ post }: PostEngagementProps) => {
  return (
    <StyledPostEngagement>
      <Replies>
        <RepliesIcon>Replies:&nbsp;</RepliesIcon>
        <RepliesCount>{post.replies}</RepliesCount>
      </Replies>
      <Reposts>
        <RepostsIcon>Reposts:&nbsp;</RepostsIcon>
        <RepostsCount>{post.reposts}</RepostsCount>
      </Reposts>
      <Likes>
        <LikesIcon>Likes:&nbsp;</LikesIcon>
        <LikesCount>{post.likes}</LikesCount>
      </Likes>
    </StyledPostEngagement>
  );
};

PostEngagement.propTypes = PostEngagementPropTypes;

export default PostEngagement;
