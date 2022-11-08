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
