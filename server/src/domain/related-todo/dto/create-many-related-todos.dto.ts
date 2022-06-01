import { IsNotEmpty, IsNumber } from 'class-validator'

export class CreateManyRelatedTodosDto {
  @IsNumber(undefined, { each: true })
  @IsNotEmpty()
  parentIds!: number[]

  @IsNumber()
  @IsNotEmpty()
  childId!: number
}
