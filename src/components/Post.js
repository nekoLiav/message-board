import styled from 'styled-components';
import PropTypes from 'prop-types';
import { formatDistanceToNowStrict } from 'date-fns';
import { Link } from 'react-router-dom';

const StyledPost = styled.div`
  display: flex;
  color: white;
  width: 100%;
  padding: 0.3rem 0;

  &:hover {
    background: #333333;
  }
`;

const Thread = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`;

const ThreadTitle = styled(Link)`
  color: white;
  width: max-content;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
`;

const ThreadInfo = styled.div`
  display: flex;
  color: white;
  font-size: 0.7rem;
`;

const StyledA = styled.a`
  color: white;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #99ccff;

  &:visited {
    color: #99ccff;
  }

  &:hover {
    text-decoration: underline;
  }
`;

const NubButtons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 3rem;
`;

const UpNubButton = styled.div`
  color: white;

  &:hover {
    color: orange;
    cursor: pointer;
  }
`;

const DownNubButton = styled.div`
  color: white;

  &:hover {
    color: lightblue;
    cursor: pointer;
  }
`;

const Nubs = styled.p`
  color: white;
`;

const ThreadButtons = styled.div`
  display: flex;
`;

const ThreadButton = styled(Link)`
  font-size: 0.7rem;
  font-weight: bold;
  text-decoration: none;
  color: white;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const Post = (props) => {
  const postData = props.post;
  const formattedTime = formatDistanceToNowStrict(
    postData.metadata['time-posted']
  );
  return (
    <StyledPost>
      <NubButtons>
        <UpNubButton>/\</UpNubButton>
        <Nubs>{postData.nubs.up - postData.nubs.down}</Nubs>
        <DownNubButton>\/</DownNubButton>
      </NubButtons>
      <Thread>
        <ThreadTitle
          state={{ sub: postData.subnublet }}
          to={`/n/comments/${postData.id}`}
        >
          {postData.content.title}
        </ThreadTitle>
        <ThreadInfo>
          submitted&nbsp;
          <StyledA>{formattedTime}</StyledA>
          &nbsp;ago by&nbsp;
          <StyledA>{postData.metadata.author}</StyledA>
          &nbsp;to&nbsp;
          <StyledLink
            to={`/n/${postData.subnublet}`}
            state={{ view: postData.subnublet }}
          >{`n/${postData.subnublet}`}</StyledLink>
        </ThreadInfo>
        <ThreadButtons>
          <ThreadButton
            state={{ sub: postData.subnublet }}
            to={`/n/comments/${postData.id}`}
          >
            {`${postData.comments}`} comments
          </ThreadButton>
        </ThreadButtons>
      </Thread>
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
    id: PropTypes.string,
  }),
};

export default Post;
