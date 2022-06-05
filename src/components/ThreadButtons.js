import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

const StyledThreadButtons = styled.div`
  display: flex;
`;

const ThreadButton = styled.p`
  font-size: 0.7rem;
  font-weight: bold;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const ThreadButtons = (props) => {
  const [comments, setComments] = useState(0);

  useEffect(() => {
    setComments(props.comments);
  }, []);

  return (
    <StyledThreadButtons>
      <ThreadButton>{`${comments}`} comments</ThreadButton>
    </StyledThreadButtons>
  );
};

ThreadButtons.propTypes = {
  comments: PropTypes.number,
};

export default ThreadButtons;
