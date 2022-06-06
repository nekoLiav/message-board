import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/firebase-config';

const StyledSubSubmission = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background: #333333;
`;

const SubSubmissionForm = styled.form`
  display: flex;
  flex-direction: column;
  background: #333333;
  width: 30rem;
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

const SubNameFieldLabel = styled.label`
  color: white;
  font-size: 1.5rem;
`;

const SubNameField = styled.input`
  width: 100%;
  background: #333333;
  color: white;
`;

const SubmitButton = styled.button`
  width: 10rem;
`;

const SubSubmission = () => {
  const navigate = useNavigate();

  const handleSubmission = (e) => {
    e.preventDefault();
    const subName = document.getElementById('subname').value;
    setDoc(doc(db, 'subnublets', subName), { merge: true });
    navigate(`/n/${subName}`, { replace: true });
  };

  return (
    <StyledSubSubmission>
      <SubSubmissionForm onSubmit={handleSubmission}>
        <FieldWrapper>
          <SubNameFieldLabel htmlFor="subname">*sub name:</SubNameFieldLabel>
          <SubNameField type="text" name="subname" id="subname" required />
        </FieldWrapper>
        <SubmitButton type="submit">submit sub</SubmitButton>
      </SubSubmissionForm>
    </StyledSubSubmission>
  );
};

export default SubSubmission;
