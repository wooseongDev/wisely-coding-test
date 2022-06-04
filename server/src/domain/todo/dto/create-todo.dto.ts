import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  text!: string

  @IsNumber(undefined, { each: true })
  @IsOptional()
  parentIds?: number[]
}
