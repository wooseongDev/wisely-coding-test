import { IsNotEmpty, IsNumber } from 'class-validator'

export class ManyRelatedTodosDto {
  @IsNumber(undefined, { each: true })
  @IsNotEmpty()
  parentIds!: number[]

  @IsNumber()
  @IsNotEmpty()
  childId!: number
}
