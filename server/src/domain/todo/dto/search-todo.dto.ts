import { Type } from 'class-transformer'
import { IsNumber, IsOptional, IsString } from 'class-validator'

import { PaginationDto } from './pagination.dto'

export class SearchTodoDto extends PaginationDto {
  @IsString()
  @IsOptional()
  text?: string

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  isCompleted?: number // 0 or 1

  @IsString()
  @IsOptional()
  createdAt?: string // YYYY-MM-DD

  @IsString()
  @IsOptional()
  updatedAt?: string // YYYY-MM-DD

  @IsString()
  @IsOptional()
  completedAt?: string // YYYY-MM-DD
}
