import * as PropTypes from 'prop-types';

export const UserType = PropTypes.shape({
  avatar: PropTypes.string.isRequired,
  birthday: PropTypes.number.isRequired,
  blurb: PropTypes.string.isRequired,
  follower_count: PropTypes.number.isRequired,
  following_count: PropTypes.number.isRequired,
  gender: PropTypes.string,
  handle: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  post_count: PropTypes.number.isRequired,
  profile_color: PropTypes.string.isRequired,
});

export const PostType = PropTypes.shape({
  user_data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    handle: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }),
  date_posted: PropTypes.number.isRequired,
  post_id: PropTypes.string.isRequired,
  parent_ids: PropTypes.array.isRequired,
  text: PropTypes.string.isRequired,
  img_url: PropTypes.string,
  vid_url: PropTypes.string,
  replies: PropTypes.number.isRequired,
  reposts: PropTypes.number.isRequired,
  likes: PropTypes.number.isRequired,
});
