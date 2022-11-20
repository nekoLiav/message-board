/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-prototype-builtins */

import { isUser } from './isUser';

// Starting from the "TypeScript: Keeping Type Guards Safe and Up To Date" article https://levelup.gitconnected.com/typescript-keeping-type-guards-safe-and-up-to-date-2457d52bd722

interface PlainObject {
  hasOwnProperty<K extends string>(key: K): this is Record<K, unknown>;
  hasOwn<K extends string>(key: K): this is Record<K, unknown>;
}

function isPlainObject(value: unknown): value is PlainObject {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

interface AppLoader {
  currentUser?: unknown;
}

export function isAppLoader(value: unknown): value is AppLoader {
  if (!isPlainObject(value)) return false;

  let currentUser: unknown | undefined;

  function test2(
    arg2: unknown
  ): arg2 is Partial<Record<keyof UserType, unknown>> {
    return arg2 !== null;
  }

  if (value.hasOwnProperty('currentUser')) {
    if (!isUser(value.currentUser)) return false;
    currentUser = value.currentUser;
  }

  const obj = { currentUser };
  const isValid: AppLoader = obj;
  const noNewOptionalProps: Omit<Required<AppLoader>, keyof typeof obj> = {};

  return true;
}
