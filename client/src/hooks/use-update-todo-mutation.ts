import { useGetManyTodosInfiniteQuery } from '@hooks/use-get-many-todos-infinite-query'
import { useSearchTodoInfiniteQuery } from '@hooks/use-search-todo-infinite-query'
import { api } from '@tools/api'
import { AxiosError } from 'axios'
import { useMutation } from 'react-query'

export const useUpdateTodoMutation = (args: {
  id: number
  onSuccess?: (values: { text?: string; isCompleted?: boolean; parentIds?: number[] }) => void
}) => {
  const { id, onSuccess } = args

  const { refetch: refetchTodos } = useGetManyTodosInfiniteQuery()
  const { refetch: refetchSearchTodos } = useSearchTodoInfiniteQuery()

  const mutation = useMutation(
    async (args: { text?: string; isCompleted?: boolean; parentIds?: number[] }) => {
      await api.updateOneTodo({ id, ...args })
    },
    {
      onSuccess: async () => {
        await refetchTodos()
        await refetchSearchTodos()
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

  const updateTodo = (args: { text: string; parentIds?: number[] }) => {
    const { text, parentIds } = args
    mutation.mutate({ text, parentIds })
  }

  return {
    ...mutation,
    updateIsCompleted,
    updateTodo,
  }
}
