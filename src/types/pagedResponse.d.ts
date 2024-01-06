interface PagedResponse<T> {
    pageNumber: number;
    pageSize: number;
    [key: string]: T[];
    length: number;  
    totalPages: number;
    totalRecords: number;
}
