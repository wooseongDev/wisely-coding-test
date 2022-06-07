import { api } from '@tools/api'
import { GetOneTodoResponse } from '@tools/api/todo/get-one-todo'
import { useMemo } from 'react'
import { useInfiniteQuery } from 'react-query'

const SIZE = 20

export const useRelatedTodoSelectList = (args: { isOnlyCompleted?: boolean } = {}) => {
  const { isOnlyCompleted = false } = args

  const query = useInfiniteQuery(
    ['/api/todos', 'for-related', isOnlyCompleted],
    async (args) => {
      const { pageParam } = args
      const isCompleted = isOnlyCompleted ? 1 : undefined

      return api.getManyTodos({ isCompleted, page: pageParam, size: SIZE })
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

  const selectData = useMemo(() => {
    if (todos === undefined) return []
    return todos.map((todo) => ({
      value: `${todo.id}`,
      label: todo.text,
    }))
  }, [todos])

  return {
    ...query,
    todos,
    selectData,
  }
}
