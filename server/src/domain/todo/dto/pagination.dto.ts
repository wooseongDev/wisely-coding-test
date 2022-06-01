import { Type } from 'class-transformer'
import { IsNumber, IsOptional, Max, Min } from 'class-validator'

// ! @Type 은 global pipe 에서 transform 이 작동하지 않아 추가함

export class PaginationDto {
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @IsOptional()
  page?: number

  @Type(() => Number)
  @IsNumber()
  @Max(50)
  @Min(1)
  @IsOptional()
  size?: number
}
