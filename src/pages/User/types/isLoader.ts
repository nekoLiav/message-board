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

interface Loader {
  user: unknown;
  userPosts?: unknown[];
}

export function isLoader(value: unknown): value is Loader {
  if (!isPlainObject(value)) return false;

  if (!value.hasOwnProperty('user')) return false;

  const { user } = value;

  if (typeof user !== 'object') return false;

  let userPosts: unknown[] | undefined;

  if (value.hasOwnProperty('userPosts')) {
    if (!Array.isArray(value.userPosts)) return false;
    userPosts = value.userPosts;
  }

  const obj = { user, userPosts };
  const isValid: Loader = obj;
  const noNewOptionalProps: Omit<Required<Loader>, keyof typeof obj> = {};

  return true;
}
