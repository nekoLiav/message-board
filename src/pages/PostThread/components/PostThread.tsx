// import { ContentSubmission } from 'features/ContentSubmission';
import { Content } from 'features/Content';
import { PostThreadContainer } from './style';
import { useLoaderData } from 'react-router-dom';
import { isLoader } from '../types/isLoader';
import { isPost } from '../types/isPost';

export const PostThread = () => {
  const loader = useLoaderData();

  if (isLoader(loader)) {
    return (
      <PostThreadContainer>
        {loader.parents &&
          loader.parents.map((post) => {
            if (isPost(post)) {
              return <Content key={post.post_id} content={post} chain={true} />;
            }
            return null;
          })}
        {loader.post && isPost(loader.post) ? (
          <Content content={loader.post} main={true} />
        ) : null}
        {/* <ContentSubmission post={post} clientUser={clientUser} /> */}
        {loader.replies &&
          loader.replies.map((post) => {
            if (isPost(post)) {
              return <Content key={post.post_id} content={post} />;
            }
            return null;
          })}
      </PostThreadContainer>
    );
  }
  return null;
};
