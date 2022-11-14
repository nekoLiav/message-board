import { useEffect, useState } from 'react';
import PostSubmission from '../components/PostSubmission';
import Post from '../components/Post';
import { getHomePosts } from '../functions/getHomePosts';
import { useRouteLoaderData } from 'react-router-dom';
import { isUser } from '../functions/assertUnknowns';
import { PostContainer } from '../components/Containers';

const Home = () => {
  const [homePosts, setHomePosts] = useState<PostType[]>();
  const clientUser = isUser(useRouteLoaderData('app'));

  useEffect(() => {
    (async () => {
      const homePostData = await getHomePosts();
      setHomePosts(homePostData);
    })();
  }, []);

  if (homePosts) {
    return (
      <div>
        <PostSubmission clientUser={clientUser} />
        <PostContainer>
          {homePosts.map((p) => (
            <Post key={p.post_id} post={p} />
          ))}
        </PostContainer>
      </div>
    );
  }

  return null;
};

export default Home;
