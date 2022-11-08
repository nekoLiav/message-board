import * as PropTypes from 'prop-types';

export const UserType = PropTypes.shape({
  avatar: PropTypes.string.isRequired,
  birthday: PropTypes.number.isRequired,
  blurb: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  follower_count: PropTypes.number.isRequired,
  following_count: PropTypes.number.isRequired,
  gender: PropTypes.string.isRequired,
  handle: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  post_count: PropTypes.number.isRequired,
  profile_color: PropTypes.string.isRequired,
});

export const PostType = PropTypes.shape({
  date_posted: PropTypes.number,
  post_id: PropTypes.string,
  parent_ids: PropTypes.array,
  text: PropTypes.string,
  img_url: PropTypes.string,
  vid_url: PropTypes.string,
  user_id: PropTypes.string,
  replies: PropTypes.number,
  reposts: PropTypes.number,
  likes: PropTypes.number,
});
