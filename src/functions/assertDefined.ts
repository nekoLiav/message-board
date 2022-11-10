// shamelessly stolen from https://dev.to/viridia/typescript-strictnullchecks-a-migration-guide-3glo
// far less verbose than putting if checks in every function

export function assertDefined<T>(value: T, name?: string): asserts value {
  if (value === null) {
    throw new Error(`${name ?? 'Value'} should not be null.`);
  }
  if (value === undefined) {
    throw new Error(`${name ?? 'Value'} should not be undefined.`);
  }
}
