import { useEffect, useState } from 'react';
import PostSubmission from '../components/PostSubmission';
import Post from '../components/Post';
import { getHomePosts } from '../functions/getHomePosts';
import { useRouteLoaderData } from 'react-router-dom';
import { isUser } from '../functions/assertUnknowns';

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
        <div>
          {homePosts.map((p) => (
            <Post key={p.post_id} post={p} />
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export default Home;
