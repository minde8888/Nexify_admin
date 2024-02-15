export const generateQueryString = (pageSize: number, pageNum: number, url: string) => `${url}?PageNumber=${pageNum}&PageSize=${pageSize}`;
