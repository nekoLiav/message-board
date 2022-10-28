import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { db } from '../../firebase/firebase-config';
import { collection, addDoc } from 'firebase/firestore';

const StyledPostSubmission = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background: #222222;
`;

const PostSubmissionForm = styled.form`
  display: flex;
  flex-direction: column;
  background: #333333;
  width: 50vw;
  height: 100%;
  gap: 1rem;
  padding: 1rem;
`;

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  background: #222222;
  width: 100%;
`;

const TitleFieldLabel = styled.label`
  color: white;
  font-size: 1.5rem;
`;

const TitleField = styled.textarea`
  width: 100%;
  height: 10rem;
  background: #333333;
  color: white;
`;

const BodyFieldLabel = styled.label`
  color: white;
  font-size: 1.5rem;
`;

const BodyField = styled.textarea`
  width: 100%;
  height: 10rem;
  background: #333333;
  color: white;
`;

const ToLabel = styled.label`
  color: white;
`;

const ToInput = styled.input`
  background: #333333;
  color: white;
`;

const SubmitButton = styled.button`
  width: 10rem;
`;

const PostSubmission = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const viewSring = location.state.pathname.slice(3);

  const handleSubmission = async (e) => {
    e.preventDefault();
    const titleContent = document.getElementById('title').value;
    const bodyContent = document.getElementById('body').value;
    const targetSub = document.getElementById('targetsub').value;
    addDoc(
      collection(db, 'subs', targetSub, 'posts'),
      {
        content: { body: bodyContent, title: titleContent },
      },
      { merge: true }
    );
    navigate('/', { replace: true });
  };

  return (
    <StyledPostSubmission>
      <PostSubmissionForm onSubmit={handleSubmission}>
        <FieldWrapper>
          <TitleFieldLabel htmlFor="title">*title:</TitleFieldLabel>
          <TitleField name="title" id="title" required></TitleField>
        </FieldWrapper>
        <FieldWrapper>
          <BodyFieldLabel htmlFor="body">body:</BodyFieldLabel>
          <BodyField name="body" id="body"></BodyField>
        </FieldWrapper>
        <FieldWrapper>
          <ToLabel>*where do you want to post?</ToLabel>
          <ToInput
            id="targetsub"
            type="text"
            defaultValue={viewSring}
            required
          />
        </FieldWrapper>
        <SubmitButton type="submit">submit post</SubmitButton>
      </PostSubmissionForm>
    </StyledPostSubmission>
  );
};

export default PostSubmission;
