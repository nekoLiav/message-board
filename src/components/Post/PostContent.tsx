import styled from 'styled-components';
import { InferProps } from 'prop-types';
import { PostType } from '../../Types/PropTypes';

const StyledPostContent = styled.div``;

const Content = styled.div``;

const Text = styled.p`
  overflow-wrap: anywhere;
  font-size: 0.875rem;
`;

const Img = styled.img`
  margin-top: 0.5rem;
  border: 1px solid grey;
  border-radius: 15px;
  max-width: 100%;
`;

const Vid = styled.p``;

const PostContentPropTypes = {
  post: PostType.isRequired,
};

type PostContentProps = InferProps<typeof PostContentPropTypes>;

const PostContent = ({ post }: PostContentProps) => {
  return (
    <StyledPostContent>
      <Content>
        <Text>{post.text}</Text>
        {post.img_url === null ? null : <Img src={post.img_url} />}
        {post.vid_url === null ? null : <Vid src={post.vid_url} />}
      </Content>
    </StyledPostContent>
  );
};

PostContent.propTypes = PostContentPropTypes;

export default PostContent;
