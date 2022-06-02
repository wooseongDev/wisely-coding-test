import { IsNotEmpty, IsNumber } from 'class-validator'

export class BaseRelatedTodoDto {
  @IsNumber()
  @IsNotEmpty()
  parentId!: number

  @IsNumber()
  @IsNotEmpty()
  childId!: number
}
