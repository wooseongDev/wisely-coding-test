import { api } from '@tools/api'
import { AxiosError } from 'axios'
import { useMutation } from 'react-query'

export const useUpdateTodoMutation = (args: {
  id: number
  onSuccess?: (values: { text?: string; isCompleted?: boolean; parentIds?: number[] }) => void
}) => {
  const { id, onSuccess } = args

  const mutation = useMutation(
    async (args: { text?: string; isCompleted?: boolean; parentIds?: number[] }) => {
      await api.updateOneTodo({ id, ...args })
    },
    {
      onSuccess: (_, values) => {
        onSuccess?.(values)
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
