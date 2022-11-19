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
  post: unknown;
  parents?: unknown[];
  replies?: unknown[];
}

export function isLoader(value: unknown): value is Loader {
  if (!isPlainObject(value)) return false;

  if (!value.hasOwnProperty('post')) return false;

  const { post } = value;

  if (typeof post !== 'object') return false;

  let parents: unknown[] | undefined;

  if (value.hasOwnProperty('parents')) {
    if (!Array.isArray(value.parents)) return false;
    parents = value.parents;
  }

  let replies: unknown[] | undefined;

  if (value.hasOwnProperty('replies')) {
    if (!Array.isArray(value.replies)) return false;
    replies = value.replies;
  }

  const obj = { post, parents, replies };
  const isValid: Loader = obj;
  const noNewOptionalProps: Omit<Required<Loader>, keyof typeof obj> = {};

  return true;
}
