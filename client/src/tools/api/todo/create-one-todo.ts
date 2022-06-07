import { axiosInstance } from '../axios-instance'

export const createOneTodo = async (args: { text: string; parentIds?: number[] }) => {
  const { text, parentIds } = args

  return axiosInstance<void>({
    method: 'POST',
    url: '/api/todos',
    data: { text, parentIds },
  })
}
