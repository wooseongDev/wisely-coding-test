import { useGetManyTodosInfiniteQuery } from '@hooks/use-get-many-todos-infinite-query'
import { api } from '@tools/api'
import { useMutation } from 'react-query'

export const useDeleteTodoMutation = (args: { id: number }) => {
  const { id } = args

  const { refetch } = useGetManyTodosInfiniteQuery()

  const mutation = useMutation(
    async () => {
      await api.deleteOneTodo({ id })
    },
    {
      onSuccess: async () => {
        await refetch()
      },
    }
  )

  const onDelete = () => {
    mutation.mutate()
  }

  return {
    ...mutation,
    onDelete,
  }
}
