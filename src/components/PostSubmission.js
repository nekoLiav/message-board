import styled from 'styled-components';
import { db } from '../firebase/firebase-config';
import { collection, setDoc, doc } from 'firebase/firestore';
import PropTypes from 'prop-types';

const StyledPostSubmission = styled.div`
  display: flex;
  background: black;
`;

const UserAvatar = styled.img`
  max-height: 50px;
  max-width: 50px;
  border-radius: 100%;
  margin-top: 7px;
  margin-left: 1rem;
`;

const PostSubmissionForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  width: 100%;
`;

const FieldWrapper = styled.div``;

const BodyField = styled.textarea`
  color: white;
  background: black;
  min-height: 100px;
  width: 100%;
  resize: none;
  border: none;
  font-size: 1.2rem;

  &:focus {
    outline: none;
  }
`;

const SubmitButton = styled.button`
  background: rgb(0, 255, 255);
  background: linear-gradient(
    90deg,
    rgba(0, 255, 255, 1) 0%,
    rgba(255, 0, 255, 1) 100%
  );
  border: none;
  height: 30px;
  width: 100px;
  border-radius: 15px;

  font-size: 1.2rem;

  &:hover {
    cursor: pointer;
  }
`;

const PostSubmission = (props) => {
  const handleSubmission = async (e) => {
    e.preventDefault();
    const newPostDoc = doc(collection(db, 'posts'));
    const postTemplate = {
      user_id: props.user.id,
      post_id: newPostDoc.id,
      parent_ids: [],
      date_posted: Date.now(),
      img_url: null,
      vid_url: null,
      text: e.target[0].value,
      tags: [],
      replies: 0,
      reposts: 0,
      likes: 0,
      is_reply: false,
    };
    if (props.post !== undefined) {
      const updatedTemplate = {
        ...postTemplate,
        parent_ids: [...props.post.parent_ids, props.post.post_id],
        is_reply: true,
      };
      setDoc(newPostDoc, updatedTemplate);
    } else {
      setDoc(newPostDoc, postTemplate);
    }
  };

  return (
    <StyledPostSubmission>
      <UserAvatar src={props.user.avatar} />
      <PostSubmissionForm onSubmit={handleSubmission}>
        <FieldWrapper>
          <BodyField name="body" id="body" placeholder="..."></BodyField>
        </FieldWrapper>
        <SubmitButton type="submit">submit</SubmitButton>
      </PostSubmissionForm>
    </StyledPostSubmission>
  );
};

PostSubmission.propTypes = {
  type: PropTypes.string,
  post: PropTypes.shape({
    post_id: PropTypes.string,
    parent_ids: PropTypes.array,
    is_reply: PropTypes.bool,
  }),
  user: PropTypes.shape({
    avatar: PropTypes.string,
    id: PropTypes.string,
  }),
};

export default PostSubmission;
