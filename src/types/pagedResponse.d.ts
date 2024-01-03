interface PagedResponse<T> {
    nextPage: null;
    pageNumber: number;
    pageSize: number;
    data: T[];
    length: number;
    previousPage: null;
    totalPages: number;
    totalRecords: number;
  }