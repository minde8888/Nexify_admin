import { removeQueryParamsFromUrl } from "./removeQueryParamsFromUrl";


describe('removeQueryParamsFromUrl', () => {
  test('removes PageNumber and PageSize from URL', () => {
    const url = 'http://example.com?PageNumber=1&PageSize=10&Sort=asc';
    const expected = 'http://example.com?Sort=asc';
    expect(removeQueryParamsFromUrl(url)).toEqual(expected);
  });

  test('returns the same URL if PageNumber and PageSize are not present', () => {
    const url = 'http://example.com?Sort=asc&Filter=name';
    expect(removeQueryParamsFromUrl(url)).toEqual(url);
  });

  test('removes only PageNumber and PageSize when they are the only query parameters', () => {
    const url = 'http://example.com?PageNumber=2&PageSize=20';
    const expected = 'http://example.com';
    expect(removeQueryParamsFromUrl(url)).toEqual(expected);
  });

  test('returns the base URL if there are no query parameters', () => {
    const url = 'http://example.com';
    expect(removeQueryParamsFromUrl(url)).toEqual(url);
  });

  test('removes PageNumber and PageSize correctly when they appear in the middle of the query string', () => {
    const url = 'http://example.com?Sort=desc&PageNumber=3&PageSize=15&Filter=active';
    const expected = 'http://example.com?Sort=desc&Filter=active';
    expect(removeQueryParamsFromUrl(url)).toEqual(expected);
  });

});
