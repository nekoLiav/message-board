import { LoadingContainer } from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

export const Loading = () => {
  return (
    <LoadingContainer>
      <FontAwesomeIcon
        className="loading-icon fa-spin fa-10x"
        icon={icon({ name: 'snowflake', style: 'solid' })}
      />
    </LoadingContainer>
  );
};
