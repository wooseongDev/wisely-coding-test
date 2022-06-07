import { useGetManyTodosInfiniteQuery } from '@hooks/use-get-many-todos-infinite-query'
import { showNotification } from '@mantine/notifications'
import { api } from '@tools/api'
import { useMutation } from 'react-query'

export const useCreateTodoMutation = () => {
  const { refetch } = useGetManyTodosInfiniteQuery()

  const mutation = useMutation(
    async (args: { text: string; parentIds?: number[] }) => {
      const { text, parentIds } = args
      await api.createOneTodo({ text, parentIds })
    },
    {
      onSuccess: async () => {
        await refetch()
        window.scrollTo({ top: 0, behavior: 'smooth' })
      },
    }
  )

  const createTodo = (args: { text: string; parentIds?: number[] }) => {
    const { text, parentIds } = args

    if (!text.trim().length) {
      showNotification({
        id: 'no-todo-text',
        color: 'red',
        message: '할 일을 입력해주세요',
        disallowClose: true,
      })
      return
    }
    mutation.mutate({ text, parentIds })
  }

  return {
    ...mutation,
    createTodo,
  }
}
