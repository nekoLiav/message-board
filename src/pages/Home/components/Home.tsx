import { Content } from 'features/Content';
import { ContentSubmission } from 'features/ContentSubmission';
import { useLoaderData } from 'react-router-dom';

type HomeLoader = {
  currentUser: UserType;
  homePosts?: PostType[];
};

export const Home = () => {
  const { currentUser, homePosts } = useLoaderData() as HomeLoader;

  return (
    <div>
      {currentUser && <ContentSubmission currentUser={currentUser} />}
      {homePosts &&
        homePosts.map((post) => <Content key={post.post_id} content={post} />)}
    </div>
  );
};
