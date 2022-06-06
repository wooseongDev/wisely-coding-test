import { TodoCard } from '@components/domain-component/todo-card'
import { css } from '@emotion/react'
import { useGetManyTodosInfiniteQuery } from '@hooks/use-get-many-todos-infinite-query'
import { useIntersection } from '@hooks/use-intersection'
import { Center, Loader, Stack } from '@mantine/core'
import React from 'react'

export const TodoList: React.FC = () => {
  const { todos, isError, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = useGetManyTodosInfiniteQuery()

  const [ref] = useIntersection(async (entry) => {
    if (!entry.isIntersecting || !hasNextPage || isFetchingNextPage) return
    await fetchNextPage()
  })

  if (isError) return <div>Error</div>
  if (!todos || isLoading) return <div>Loading</div>
  return (
    <Stack css={rootStyle} spacing="md">
      {todos.map((todo) => (
        <TodoCard key={todo.id} todo={todo} />
      ))}

      {hasNextPage && (
        <Center ref={ref}>
          <Loader size="sm" />
        </Center>
      )}
    </Stack>
  )
}

const rootStyle = css`
  padding: 20px 20px 120px;
`
