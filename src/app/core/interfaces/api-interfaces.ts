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
    pageable: Pageable,
    size: number,
    number: number,
    sort: Sort,
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
}/**
 * Representa la configuración de ordenamiento en una paginación.
 */
export interface Sort {
  sorted: boolean;
  empty: boolean;
  unsorted: boolean;
}

/**
 * Representa la información de paginación del backend.
 */
export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

/**
 * Representa la respuesta completa del endpoint de instituciones paginadas.
 */
export interface ResponseApiPublic<T = any> {
  content: T[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: Sort;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

