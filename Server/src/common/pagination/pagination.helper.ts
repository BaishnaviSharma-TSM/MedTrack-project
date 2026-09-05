import { PaginationMetaDto } from '../dto/api-response.dto';

export interface PaginatedResult<T> {
  items: T[];
  pagination: PaginationMetaDto;
}

export function buildPagination(
  page: number,
  limit: number,
  totalItems: number,
): PaginationMetaDto {
  const totalPages = totalItems === 0 ? 0 : Math.ceil(totalItems / limit);

  return {
    page,
    limit,
    totalItems,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
}

export function normalizePagination(page = 1, limit = 20) {
  const safePage = Math.max(1, Number(page) || 1);
  const safeLimit = Math.min(100, Math.max(1, Number(limit) || 20));
  const skip = (safePage - 1) * safeLimit;

  return { page: safePage, limit: safeLimit, skip };
}
