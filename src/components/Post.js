import styled from 'styled-components';
import PropTypes from 'prop-types';
import { formatDistanceToNowStrict } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const StyledPost = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  width: 100%;
  height: max-content;
  border-width: 0 1px 1px 1px;
  border-color: grey;
  border-style: solid;
  min-height: 100px;

  &:hover {
    background: #333333;
  }
`;

const Info = styled.div`
  display: flex;
`;

const Author = styled.p``;

const Created = styled.p`
  color: grey;
`;

const Body = styled.p`
  padding: 5px 0;
`;

const Post = (props) => {
  const navigate = useNavigate();

  const body = props.post.body;
  const created = formatDistanceToNowStrict(props.post.created);
  const createdString = `${created.split(' ')[0]}${created.split(' ')[1][0]}`;
  const authorName = props.post.authorName;
  const authorID = props.post.authorID;
  const postID = props.post.postID;

  const handleClick = (clickEvent) => {
    clickEvent.preventDefault();
    navigate(`/user/${authorID}/post/${postID}`);
  };

  return (
    <StyledPost onClick={handleClick}>
      <Info>
        <Author>{authorName}&nbsp;</Author>
        <Created>&#x2022;&nbsp;{createdString}</Created>
      </Info>
      <Body>{body}</Body>
    </StyledPost>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    authorName: PropTypes.string,
    authorID: PropTypes.string,
    body: PropTypes.string,
    created: PropTypes.number,
    postID: PropTypes.string,
  }),
};

export default Post;
