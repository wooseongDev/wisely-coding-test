import { useGetManyTodosInfiniteQuery } from '@hooks/use-get-many-todos-infinite-query'
import { api } from '@tools/api'
import { AxiosError } from 'axios'
import { useMutation } from 'react-query'

export const useUpdateTodoMutation = (args: { id: number }) => {
  const { id } = args

  const { refetch } = useGetManyTodosInfiniteQuery()

  const mutation = useMutation(
    async (args: { text?: string; isCompleted?: boolean; parentIds?: number[] }) => {
      await api.updateOneTodo({ id, ...args })
    },
    {
      onSuccess: async () => {
        await refetch()
      },
      onError: (error) => {
        if (!(error instanceof AxiosError)) return

        if (error.response?.status === 400) {
          // todo modal component 작성해야함
          alert('선행 작업이 완료되지 않았습니다.')
        }
      },
    }
  )

  const updateIsCompleted = (isCompleted: boolean) => {
    mutation.mutate({ isCompleted })
  }

  return {
    ...mutation,
    updateIsCompleted,
  }
}
