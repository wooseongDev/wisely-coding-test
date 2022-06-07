import { api } from '@tools/api'
import { GetManyTodosResponse } from '@tools/api/todo/get-many-todos'
import { GetOneTodoResponse } from '@tools/api/todo/get-one-todo'
import { queryString } from '@tools/util/queryString.util'
import { useInfiniteQuery } from 'react-query'
import { useSearchParams } from 'react-router-dom'

const SIZE = 20

export const useSearchTodoInfiniteQuery = () => {
  const [searchParams] = useSearchParams()
  const parsedQuery = queryString.parseSearchParams(searchParams)

  const queryKey = ['/api/todos', parsedQuery]

  const query = useInfiniteQuery<GetManyTodosResponse>(
    queryKey,
    async (args) => {
      const { pageParam } = args
      return api.getManyTodos({ ...parsedQuery, page: pageParam, size: SIZE })
    },
    {
      getNextPageParam: (response, prevResponses) => {
        const lastPage = Math.ceil(response.total / SIZE)
        if (prevResponses.length >= lastPage) return false
        return prevResponses.length + 1
      },
    }
  )

  const total = query.data?.pages[0]?.total ?? 0
  const todos = query.data?.pages.reduce((acc: GetOneTodoResponse[], page) => [...acc, ...page.data], [])

  return {
    ...query,
    queryKey,
    total,
    todos,
  }
}
