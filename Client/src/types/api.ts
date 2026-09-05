export type ApiFieldError = {
  field: string;
  message: string;
};

export type PaginationMeta = {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type ApiResponse<T> = {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  pagination?: PaginationMeta;
  errors?: ApiFieldError[];
};

export class ApiError extends Error {
  statusCode: number;
  errors: ApiFieldError[];

  constructor(message: string, statusCode: number, errors: ApiFieldError[] = []) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

export type ListQueryParams = {
  q?: string;
  range?: 'all' | '7d' | '30d';
  from?: string;
  to?: string;
  page?: number;
  limit?: number;
};
