/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-prototype-builtins */

// Starting from the "TypeScript: Keeping Type Guards Safe and Up To Date" article https://levelup.gitconnected.com/typescript-keeping-type-guards-safe-and-up-to-date-2457d52bd722

interface PlainObject {
  hasOwnProperty<K extends string>(key: K): this is Record<K, unknown>;
  hasOwn<K extends string>(key: K): this is Record<K, unknown>;
}

function isPlainObject(value: unknown): value is PlainObject {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

interface PostUserData {
  id: string;
  name: string;
  handle: string;
  avatar: string;
}

export function isPostUserData(value: unknown): value is PostUserData {
  if (!isPlainObject(value)) return false;

  // Required fields

  if (!value.hasOwnProperty('id')) return false;
  if (!value.hasOwnProperty('name')) return false;
  if (!value.hasOwnProperty('handle')) return false;
  if (!value.hasOwnProperty('avatar')) return false;

  const { id, name, handle, avatar } = value;

  if (typeof id !== 'string') return false;
  if (typeof name !== 'string') return false;
  if (typeof handle !== 'string') return false;
  if (typeof avatar !== 'string') return false;

  const obj = { id, name, handle, avatar };
  const isValid: PostUserData = obj;
  const noNewOptionalProps: Omit<Required<PostUserData>, keyof typeof obj> = {};

  return true;
}

interface PostType {
  date_posted: number;
  post_id: string;
  parent_ids: string[];
  text: string;
  direct_parent?: string;
  img_url?: string;
  vid_url?: string;
  replies: number;
  reposts: number;
  likes: number;
  tags: string[];
  is_reply: boolean;
  user_data: {
    id: string;
    name: string;
    handle: string;
    avatar: string;
  };
}

export function isPost(value: unknown): value is PostType {
  if (!isPlainObject(value)) return false;

  // Required fields

  if (!value.hasOwnProperty('user_data')) return false;
  if (!value.hasOwnProperty('date_posted')) return false;
  if (!value.hasOwnProperty('post_id')) return false;
  if (!value.hasOwnProperty('parent_ids')) return false;
  if (!value.hasOwnProperty('text')) return false;
  if (!value.hasOwnProperty('replies')) return false;
  if (!value.hasOwnProperty('reposts')) return false;
  if (!value.hasOwnProperty('likes')) return false;
  if (!value.hasOwnProperty('tags')) return false;
  if (!value.hasOwnProperty('is_reply')) return false;

  const {
    user_data,
    date_posted,
    post_id,
    parent_ids,
    text,
    replies,
    reposts,
    likes,
    tags,
    is_reply,
  } = value;

  if (!isPostUserData(user_data)) return false;
  if (typeof date_posted !== 'number') return false;
  if (typeof post_id !== 'string') return false;
  if (!Array.isArray(parent_ids)) return false;
  if (typeof text !== 'string') return false;
  if (typeof replies !== 'number') return false;
  if (typeof reposts !== 'number') return false;
  if (typeof likes !== 'number') return false;
  if (!Array.isArray(tags)) return false;
  if (typeof is_reply !== 'boolean') return false;

  // Optional Fields
  // Every optional field must be mapped to a local variable only when it exists

  let direct_parent: string | undefined;

  if (value.hasOwnProperty('direct_parent')) {
    if (typeof value.direct_parent !== 'string') return false;
    direct_parent = value.direct_parent;
  }

  let img_url: string | undefined;

  if (value.hasOwnProperty('img_url')) {
    if (typeof value.img_url !== 'string') return false;
    img_url = value.img_url;
  }

  let vid_url: string | undefined;

  if (value.hasOwnProperty('vid_url')) {
    if (typeof value.vid_url !== 'string') return false;
    vid_url = value.vid_url;
  }

  const obj = {
    user_data,
    date_posted,
    post_id,
    parent_ids,
    text,
    direct_parent,
    img_url,
    vid_url,
    replies,
    reposts,
    likes,
    tags,
    is_reply,
  };
  const isValid: PostType = obj;
  const noNewOptionalProps: Omit<Required<PostType>, keyof typeof obj> = {};

  return true;
}
