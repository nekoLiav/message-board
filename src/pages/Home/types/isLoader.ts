/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-prototype-builtins */

// Starting from the "TypeScript: Keeping Type Guards Safe and Up To Date" article https://levelup.gitconnected.com/typescript-keeping-type-guards-safe-and-up-to-date-2457d52bd722

interface PlainObject {
  hasOwnProperty<K extends string>(key: K): this is Record<K, unknown>;
}

function isPlainObject(value: unknown): value is PlainObject {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

interface Loader {
  posts?: unknown[];
}

export function isLoader(value: unknown): value is Loader {
  if (!isPlainObject(value)) return false;

  let posts: unknown[] | undefined;

  if (value.hasOwnProperty('posts')) {
    if (!Array.isArray(value.posts)) return false;
    posts = value.posts;
  }

  const obj = { posts };
  const isValid: Loader = obj;
  const noNewOptionalProps: Omit<Required<Loader>, keyof typeof obj> = {};

  return true;
}
