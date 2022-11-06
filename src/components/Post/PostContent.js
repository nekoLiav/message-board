import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledPostContent = styled.div`
  height: 100%;
`;

const Content = styled.div`
  height: 100%;
`;

const Text = styled.p`
  overflow-wrap: anywhere;
`;

const Img = styled.img`
  margin-top: 0.5rem;
  border: 1px solid grey;
  border-radius: 15px;
  max-width: 100%;
`;

const Vid = styled.p``;

const PostContent = (props) => {
  return (
    <StyledPostContent>
      <Content>
        <Text>{props.text}</Text>
        {props.img_url === null ? null : <Img src={props.img_url} />}
        {props.vid_url === null ? null : <Vid src={props.vid_url} />}
      </Content>
    </StyledPostContent>
  );
};

PostContent.propTypes = {
  text: PropTypes.string,
  img_url: PropTypes.string,
  vid_url: PropTypes.string,
};

export default PostContent;
