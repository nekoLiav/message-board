/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-prototype-builtins */

import { isPost } from 'types/isPost';

// Starting from the "TypeScript: Keeping Type Guards Safe and Up To Date" article https://levelup.gitconnected.com/typescript-keeping-type-guards-safe-and-up-to-date-2457d52bd722

interface PlainObject {
  hasOwnProperty<K extends string>(key: K): this is Record<K, unknown>;
  hasOwn<K extends string>(key: K): this is Record<K, unknown>;
}

function isPlainObject(value: unknown): value is PlainObject {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

interface Loader {
  homePosts?: unknown[];
}

export function isHomeLoader(value: unknown): value is Loader {
  if (!isPlainObject(value)) return false;

  let homePosts: unknown[] | undefined;

  if (value.hasOwnProperty('homePosts')) {
    if (!Array.isArray(value.homePosts)) return false;
    if (!value.homePosts.every((post) => isPost(post))) return false;
    homePosts = value.homePosts;
  }

  const obj = { homePosts };
  const isValid: Loader = obj;
  const noNewOptionalProps: Omit<Required<Loader>, keyof typeof obj> = {};

  return true;
}
