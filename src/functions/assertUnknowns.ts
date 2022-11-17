// TL;DR: The data that is returned from the loaders in the new data API from React Router Dom v6.4 are considered "unknown" before they are typecast as an object, etc.
// https://github.com/remix-run/react-router/issues/9189

function assertUser(user: unknown): user is UserType {
  function assertUserLike(
    given: unknown
  ): given is Partial<Record<keyof UserType, unknown>> {
    return typeof given === 'object' && given !== null;
  }
  return (
    assertUserLike(user) &&
    typeof user.avatar === 'string' &&
    typeof user.birthday === 'number' &&
    typeof user.blurb === 'string' &&
    typeof user.follower_count === 'number' &&
    typeof user.following_count === 'number' &&
    typeof user.gender === 'string' &&
    typeof user.handle === 'string' &&
    typeof user.id === 'string' &&
    typeof user.name === 'string' &&
    typeof user.post_count === 'number' &&
    typeof user.profile_color === 'string'
  );
}

export function isUser(user: unknown) {
  if (assertUser(user)) {
    return user;
  }
  throw new Error('Not a valid user object!');
}

function assertPost(post: unknown): post is PostType {
  function assertPostLike(
    given: unknown
  ): given is Partial<Record<keyof PostType, unknown>> {
    return typeof given === 'object' && given !== null;
  }
  return (
    assertPostLike(post) &&
    typeof post.user_data === 'object' &&
    typeof post.date_posted === 'number' &&
    typeof post.post_id === 'string' &&
    Array.isArray(post.parent_ids) &&
    typeof post.text === 'string' &&
    typeof post.direct_parent === 'string' &&
    typeof post.img_url === 'string' &&
    typeof post.vid_url === 'string' &&
    typeof post.replies === 'number' &&
    typeof post.reposts === 'number' &&
    typeof post.likes === 'number' &&
    typeof post.is_reply === 'boolean' &&
    Array.isArray(post.tags)
  );
}

export function isPost(post: unknown) {
  if (assertUser(post)) {
    return post;
  }
  throw new Error('Not a valid post object!');
}
