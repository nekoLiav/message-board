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

export function isUser(value: unknown): value is UserType {
  if (!isPlainObject(value)) return false;

  // Required fields

  if (!value.hasOwnProperty('id')) return false;
  if (!value.hasOwnProperty('handle')) return false;
  if (!value.hasOwnProperty('name')) return false;
  if (!value.hasOwnProperty('avatar')) return false;
  if (!value.hasOwnProperty('birthday')) return false;
  if (!value.hasOwnProperty('gender')) return false;
  if (!value.hasOwnProperty('blurb')) return false;
  if (!value.hasOwnProperty('profile_color')) return false;
  if (!value.hasOwnProperty('post_count')) return false;
  if (!value.hasOwnProperty('follower_count')) return false;
  if (!value.hasOwnProperty('following_count')) return false;

  const {
    id,
    handle,
    name,
    avatar,
    birthday,
    gender,
    blurb,
    profile_color,
    post_count,
    follower_count,
    following_count,
  } = value;

  if (typeof id !== 'string') return false;
  if (typeof handle !== 'string') return false;
  if (typeof name !== 'string') return false;
  if (typeof avatar !== 'string') return false;
  if (typeof birthday !== 'number') return false;
  if (typeof gender !== 'string') return false;
  if (typeof blurb !== 'string') return false;
  if (typeof profile_color !== 'string') return false;
  if (typeof post_count !== 'number') return false;
  if (typeof follower_count !== 'number') return false;
  if (typeof following_count !== 'number') return false;

  // Optional Fields
  // Every optional field must be mapped to a local variable only when it exists

  const obj = {
    id,
    handle,
    name,
    avatar,
    birthday,
    gender,
    blurb,
    profile_color,
    post_count,
    follower_count,
    following_count,
  };

  // No extra keys from those specified in obj
  if (!Object.keys(value).every((key) => key in obj)) return false;

  const isValid: UserType = obj;
  const noNewOptionalProps: Omit<Required<UserType>, keyof typeof obj> = {};

  return true;
}
