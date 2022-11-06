import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledPostContent = styled.div``;

const Content = styled.div``;

const Text = styled.p``;

const Img = styled.img`
  border-radius: 15px;
  max-width: 100%;
  margin-top: 1rem;
  border: 1px solid grey;
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
