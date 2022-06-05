import { api } from '@tools/api'
import { GetManyTodosResponse } from '@tools/api/todo/get-many-todos'
import { GetOneTodoResponse } from '@tools/api/todo/get-one-todo'
import { useInfiniteQuery, useQueryClient } from 'react-query'

const SIZE = 20

export const useGetManyTodosInfiniteQuery = () => {
  const queryClient = useQueryClient()

  const query = useInfiniteQuery<GetManyTodosResponse>(
    '/api/todos',
    async (args) => {
      const { pageParam } = args
      return api.getManyTodos({ page: pageParam, size: SIZE })
    },
    {
      getNextPageParam: (response, prevResponses) => {
        const lastPage = Math.ceil(response.total / SIZE)
        if (prevResponses.length >= lastPage) return false
        return prevResponses.length + 1
      },
    }
  )

  const todos = query.data?.pages.reduce((acc: GetOneTodoResponse[], page) => [...acc, ...page.data], [])

  return {
    ...query,
    todos,
  }
}
