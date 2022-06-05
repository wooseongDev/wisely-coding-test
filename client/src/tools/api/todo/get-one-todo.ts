import { axiosInstance } from '../axios-instance'

export type TodoResource = {
  id: number
  text: string
  isCompleted: boolean
  completedAt: string | null
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}

export type GetOneTodoResponse = TodoResource & {
  parentTodos: {
    id: number
    parentId: number
    childId: number
    createdAt: string
    updatedAt: string
    deletedAt: string | null
  }[]
}

export const getOneTodo = async (args: { id: number }) => {
  const { id } = args

  return axiosInstance<GetOneTodoResponse>({
    method: 'GET',
    url: '/todos/{id}',
    urlParams: { id },
  })
}
