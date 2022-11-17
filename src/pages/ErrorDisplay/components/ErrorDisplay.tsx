import { ErrorDisplayContainer } from './style';

type Props = {
  children: string;
};

export const ErrorDisplay = ({ children }: Props) => {
  return <ErrorDisplayContainer>{children}</ErrorDisplayContainer>;
};
