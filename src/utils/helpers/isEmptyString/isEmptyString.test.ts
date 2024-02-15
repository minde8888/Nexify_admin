import { isEmptyString } from "./isEmptyString";

describe('isEmptyString', () => {
  test('returns true for an empty string', () => {
    const result = isEmptyString('');
    expect(result).toBe(true);
  });

  test('returns false for a string containing only whitespace', () => {
    const result = isEmptyString(' ');
    expect(result).toBe(false);
  });

  test('returns false for a non-empty string', () => {
    const result = isEmptyString('hello');
    expect(result).toBe(false);
  });

  test('returns false for a string with whitespace characters', () => {
    const result = isEmptyString(' hello ');
    expect(result).toBe(false);
  });

  // Additional tests for edge cases
  test('returns false for a string containing only newline characters', () => {
    const result = isEmptyString('\n');
    expect(result).toBe(false);
  });

  test('returns false for a string containing only tab characters', () => {
    const result = isEmptyString('\t');
    expect(result).toBe(false);
  });
});
