import { ErrorDisplayContainer } from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useRouteError } from 'react-router-dom';

type Props = {
  loadingError?: string;
};

export const ErrorDisplay = (props: Props) => {
  const routeError = useRouteError() as Error;
  const { loadingError } = props;

  return (
    <ErrorDisplayContainer>
      <FontAwesomeIcon
        className="loading-icon fa-5x"
        icon={icon({ name: 'bug', style: 'solid' })}
      />
      Something went super wrong. My bad!
      {routeError && routeError.toString()}
      {loadingError && loadingError}
    </ErrorDisplayContainer>
  );
};
