import Modal from 'components/Modal/Modal';
import {
  SignInBlurb,
  StyledForm,
  StyledInput,
  ModalErrorText,
  StyledSubmitButton,
} from './style';
import { useForm } from 'react-hook-form';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'config';
import { useNavigate } from 'react-router-dom';

type FormData = {
  email: string;
  password: string;
};

export const SignInModal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    const { email, password } = data;

    signInWithEmailAndPassword(auth, email, password).then(() => {
      navigate(0);
    });
  });

  return (
    <Modal>
      <StyledForm onSubmit={onSubmit}>
        <SignInBlurb></SignInBlurb>
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
        <StyledSubmitButton type="submit">Sign In</StyledSubmitButton>
      </StyledForm>
    </Modal>
  );
};
