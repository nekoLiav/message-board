import Modal from 'components/Modal/Modal';
import { useForm } from 'react-hook-form';
import { auth } from 'config';
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

type FormData = {
  email: string;
  password: string;
  verifypassword: string;
};

export const SignUpModal = () => {
  const [passwordMismatch, setPasswordMismatch] = useState(false);

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

    createUserWithEmailAndPassword(auth, email, password).then(() => {
      redirect('/home');
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
