import { removePartFromUrl } from "./removePartFromUrl";


describe('removePartFromUrl', () => {
  test('removes the specified prefix from the start of the URL', () => {
    const url = 'https://example.com/page';
    const prefixToRemove = 'https://example.com';
    const expected = 'page';
    expect(removePartFromUrl(url, prefixToRemove)).toEqual(expected);
  });

  test('does not modify the URL when the prefix does not exist', () => {
    const url = 'https://example.com/page';
    const prefixToRemove = 'https://anotherdomain.com';
    expect(removePartFromUrl(url, prefixToRemove)).toEqual(url);
  });

  test('does not remove the prefix if it is not at the start', () => {
    const url = 'https://example.com/https://anotherdomain.com/page';
    const prefixToRemove = 'https://anotherdomain.com';
    expect(removePartFromUrl(url, prefixToRemove)).toEqual(url);
  });

  test('removes the prefix correctly with trailing slash in the prefix parameter', () => {
    const url = 'https://example.com/page';
    const prefixToRemove = 'https://example.com/';
    const expected = 'page';
    expect(removePartFromUrl(url, prefixToRemove)).toEqual(expected);
  });

  test('returns the original URL if the prefixToRemove is empty', () => {
    const url = 'https://example.com/page';
    const prefixToRemove = '';
    expect(removePartFromUrl(url, prefixToRemove)).toEqual(url);
  });

  test('returns the original URL if the URL is empty', () => {
    const url = '';
    const prefixToRemove = 'https://example.com';
    expect(removePartFromUrl(url, prefixToRemove)).toEqual(url);
  });
});
