import Modal from 'components/Modal/Modal';
import { useForm } from 'react-hook-form';
import { auth, db } from 'config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { redirect } from 'react-router-dom';
import {
  CreateAccountBlurb,
  ModalErrorText,
  StyledForm,
  StyledInput,
  StyledSubmitButton,
} from './style';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { doc, setDoc } from 'firebase/firestore';

type FormData = {
  email: string;
  password: string;
  verifypassword: string;
};

export const SignUpModal = () => {
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit((data) => {
    const { email, password, verifypassword } = data;

    if (password !== verifypassword) {
      setPasswordMismatch(true);
    } else {
      setPasswordMismatch(false);
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(async () => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const { uid } = auth.currentUser!;
        await setDoc(doc(db, 'users', uid), {
          id: uid,
          birthday: Date.now(),
        });
        await redirect('/home');
        navigate(0);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <Modal>
      <StyledForm onSubmit={onSubmit}>
        <CreateAccountBlurb>
          Welcome. Please create an account.
        </CreateAccountBlurb>
        <StyledInput
          placeholder="email"
          {...register('email', { required: true })}
        />
        {errors.email && (
          <ModalErrorText>This field is required.</ModalErrorText>
        )}
        <StyledInput
          placeholder="password"
          {...register('password', { required: true })}
        />
        {errors.password && (
          <ModalErrorText>This field is required.</ModalErrorText>
        )}
        <StyledInput
          placeholder="retype password"
          {...register('verifypassword', { required: true })}
        />
        {errors.verifypassword && (
          <ModalErrorText>This field is required.</ModalErrorText>
        )}
        {passwordMismatch && (
          <ModalErrorText>Passwords do not match.</ModalErrorText>
        )}
        <StyledSubmitButton type="submit">Submit</StyledSubmitButton>
      </StyledForm>
    </Modal>
  );
};
