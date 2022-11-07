import * as PropTypes from 'prop-types';

export const UserType = PropTypes.shape({
  avatar: PropTypes.string,
  birthday: PropTypes.number,
  blurb: PropTypes.string,
  email: PropTypes.string,
  follower_count: PropTypes.number,
  following_count: PropTypes.number,
  gender: PropTypes.string,
  handle: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  post_count: PropTypes.number.isRequired,
  profile_color: PropTypes.string,
});
