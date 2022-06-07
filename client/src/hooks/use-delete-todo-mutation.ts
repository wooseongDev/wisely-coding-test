import { useGetManyTodosInfiniteQuery } from '@hooks/use-get-many-todos-infinite-query'
import { useSearchTodoInfiniteQuery } from '@hooks/use-search-todo-infinite-query'
import { useModals } from '@mantine/modals'
import { api } from '@tools/api'
import { useMutation } from 'react-query'

export const useDeleteTodoMutation = (args: { id: number }) => {
  const { id } = args

  const modals = useModals()
  const { refetch: refetchTodos } = useGetManyTodosInfiniteQuery()
  const { refetch: refetchSearchTodos } = useSearchTodoInfiniteQuery()

  const mutation = useMutation(
    async () => {
      await api.deleteOneTodo({ id })
    },
    {
      onSuccess: async () => {
        await refetchTodos()
        await refetchSearchTodos()
      },
    }
  )

  const onDelete = () => {
    modals.openConfirmModal({
      centered: true,
      title: '삭제하시겠습니까?',
      labels: { confirm: '삭제', cancel: '취소' },
      confirmProps: { color: 'red' },
      onConfirm: () => {
        mutation.mutate()
      },
    })
  }

  return {
    ...mutation,
    onDelete,
  }
}
