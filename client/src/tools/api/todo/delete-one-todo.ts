import { axiosInstance } from '@tools/api/axios-instance'

export const deleteOneTodo = async (args: { id: number }) => {
  const { id } = args

  return axiosInstance<void>({
    method: 'DELETE',
    url: '/api/todos/{id}',
    urlParams: { id },
  })
}
