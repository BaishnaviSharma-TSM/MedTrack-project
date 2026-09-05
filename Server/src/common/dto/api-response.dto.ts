import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ApiFieldErrorDto {
  @ApiProperty()
  field: string;

  @ApiProperty()
  message: string;
}

export class PaginationMetaDto {
  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;

  @ApiProperty()
  totalItems: number;

  @ApiProperty()
  totalPages: number;

  @ApiProperty()
  hasNextPage: boolean;

  @ApiProperty()
  hasPreviousPage: boolean;
}

export class ApiResponseDto<T = unknown> {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;

  @ApiPropertyOptional({ nullable: true })
  data: T | null;

  @ApiPropertyOptional({ type: PaginationMetaDto })
  pagination?: PaginationMetaDto;

  @ApiPropertyOptional({ type: [ApiFieldErrorDto] })
  errors?: ApiFieldErrorDto[];
}
