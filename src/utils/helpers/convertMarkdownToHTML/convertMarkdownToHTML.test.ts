import { generateQueryString } from "../generateQueryString/generateQueryString";

describe('generateQueryString', () => {
  test('correctly appends pageSize and pageNum to URL', () => {
    const url = 'http://example.com';
    const pageSize = 10;
    const pageNum = 1;
    const expected = 'http://example.com?PageNumber=1&PageSize=10';
    expect(generateQueryString(pageSize, pageNum, url)).toBe(expected);
  });

  test('handles zero values for pageNum and pageSize', () => {
    const url = 'http://example.com';
    const pageSize = 0;
    const pageNum = 0;
    const expected = 'http://example.com?PageNumber=0&PageSize=0';
    expect(generateQueryString(pageSize, pageNum, url)).toBe(expected);
  });

  test('handles negative values for pageNum and pageSize', () => {
    const url = 'http://example.com';
    const pageSize = -1;
    const pageNum = -2;
    const expected = 'http://example.com?PageNumber=-2&PageSize=-1';
    expect(generateQueryString(pageSize, pageNum, url)).toBe(expected);
  });

  test('handles large numbers for pageNum and pageSize', () => {
    const url = 'http://example.com';
    const pageSize = 10000;
    const pageNum = 5000;
    const expected = 'http://example.com?PageNumber=5000&PageSize=10000';
    expect(generateQueryString(pageSize, pageNum, url)).toBe(expected);
  });
});
