import { useGetManyTodosInfiniteQuery } from '@hooks/use-get-many-todos-infinite-query'
import { useSearchTodoInfiniteQuery } from '@hooks/use-search-todo-infinite-query'
import { showNotification } from '@mantine/notifications'
import { api } from '@tools/api'
import { AxiosError } from 'axios'
import { useMutation } from 'react-query'

export const useUpdateTodoMutation = (args: { id: number }) => {
  const { id } = args

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
          showNotification({
            id: 'not-completed-parent-todo',
            color: 'red',
            message: '선행 작업이 완료되지 않았습니다.',
            disallowClose: true,
          })
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
