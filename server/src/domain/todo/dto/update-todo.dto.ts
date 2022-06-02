import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateTodoDto {
  @IsString()
  @IsOptional()
  text?: string

  @IsBoolean()
  @IsOptional()
  isCompleted?: boolean

  @IsNumber(undefined, { each: true })
  @IsOptional()
  parentIds?: number[]
}
