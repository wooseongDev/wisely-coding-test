import { useGetManyTodosInfiniteQuery } from '@hooks/use-get-many-todos-infinite-query'
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
        window.scroll({ top: 0 })
      },
    }
  )

  const createTodo = (args: { text: string; parentIds?: number[] }) => {
    const { text, parentIds } = args

    if (!text.trim().length) return alert('할 일을 입력해주세요.')
    mutation.mutate({ text, parentIds })
  }

  return {
    ...mutation,
    createTodo,
  }
}
