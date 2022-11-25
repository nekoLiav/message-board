import { ErrorDisplayContainer } from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useRouteError } from 'react-router-dom';

export const ErrorDisplay = () => {
  const error = useRouteError() as Error;
  console.log(error);

  return (
    <ErrorDisplayContainer>
      <FontAwesomeIcon
        className="loading-icon fa-5x"
        icon={icon({ name: 'bug', style: 'solid' })}
      />
      Something went super wrong. My bad!
      {error.toString()}
    </ErrorDisplayContainer>
  );
};
