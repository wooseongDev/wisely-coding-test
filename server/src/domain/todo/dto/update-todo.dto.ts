import { IsBoolean, IsOptional, IsString } from 'class-validator'

export class UpdateTodoDto {
  @IsString()
  @IsOptional()
  text?: string

  @IsBoolean()
  @IsOptional()
  isCompleted?: boolean
}
