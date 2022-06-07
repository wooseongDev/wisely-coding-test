import { axiosInstance } from '../axios-instance'
import { GetOneTodoResponse } from './get-one-todo'

export type GetManyTodosResponse = {
  total: number
  data: GetOneTodoResponse[]
}

export const getManyTodos = async (
  args: {
    text?: string
    isCompleted?: 0 | 1
    completedAt?: string
    createdAt?: string
    updatedAt?: string
    page?: number
    size?: number
  } = {}
) => {
  const { text, isCompleted, completedAt, createdAt, updatedAt, page, size } = args

  return axiosInstance<GetManyTodosResponse>({
    method: 'GET',
    url: '/api/todos',
    params: {
      text,
      isCompleted,
      completedAt,
      createdAt,
      updatedAt,
      page,
      size,
    },
  })
}
