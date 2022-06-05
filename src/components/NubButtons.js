import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledNubButtons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 3rem;
`;

const UpNubButton = styled.div`
  color: white;

  &:hover {
    color: orange;
    cursor: pointer;
  }
`;

const DownNubButton = styled.div`
  color: white;

  &:hover {
    color: lightblue;
    cursor: pointer;
  }
`;

const Nubs = styled.p`
  color: white;
`;

const NubButtons = (props) => {
  return (
    <StyledNubButtons>
      <UpNubButton>/\</UpNubButton>
      <Nubs>{props.nubs}</Nubs>
      <DownNubButton>\/</DownNubButton>
    </StyledNubButtons>
  );
};

NubButtons.propTypes = {
  nubs: PropTypes.number,
};

export default NubButtons;
