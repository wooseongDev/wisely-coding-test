import { axiosInstance } from '../axios-instance'

export const updateOneTodo = async (args: {
  id: number
  text?: string
  isCompleted?: boolean
  parentIds?: number[]
}) => {
  const { id, text, isCompleted, parentIds } = args

  return axiosInstance<void>({
    method: 'PATCH',
    url: '/api/todos/{id}',
    urlParams: { id },
    data: { text, isCompleted, parentIds },
  })
}
