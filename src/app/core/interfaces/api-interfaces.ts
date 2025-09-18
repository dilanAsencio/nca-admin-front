export interface Paginate {
    page?: number,
    size?: number,
    sort?: string[],
    search?: string,
    status?: string,
    isActive?: boolean,
}
export class PaginateIMPL implements Paginate {
    page?: number = 0;
    size?: number = 10;
    sort?: string[] = [];
    search?: string = "";
    status?: string = "";
    isActive?: boolean = true;
}

interface DataResponse<T = any> {
    totalPages: number,
    totalElements: number,
    pageable: {
      pageNumber: number,
      pageSize: number,
      offset: number,
      sort: {
        sorted: boolean,
        empty: boolean,
        unsorted: boolean,
      },
      paged: boolean,
      unpaged: boolean,
    },
    size: number,
    number: number,
    sort: {
      sorted: boolean,
      empty: boolean,
      unsorted: boolean,
    },
    first: boolean,
    last: boolean,
    numberOfElements: number,
    empty: boolean,
    content: T[],
}

export interface Response<T = any> {
  data: DataResponse<T> | T;
  success: boolean;
  message: string;
  timestamp: string;
  error?: any;
  path?: string;
  status?: number;
}

