import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

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
  const viewSring = location.state.pathname.slice(3);

  return (
    <StyledPostSubmission>
      <PostSubmissionForm onSubmit={(e) => e.preventDefault()}>
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
          <ToInput type="text" value={viewSring} readOnly required />
        </FieldWrapper>
        <SubmitButton type="submit">Submit Post</SubmitButton>
      </PostSubmissionForm>
    </StyledPostSubmission>
  );
};

export default PostSubmission;
