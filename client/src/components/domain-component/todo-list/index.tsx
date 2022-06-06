import { TodoCard } from '@components/domain-component/todo-card'
import { css } from '@emotion/react'
import { useGetManyTodosInfiniteQuery } from '@hooks/use-get-many-todos-infinite-query'
import { useIntersection } from '@hooks/use-intersection'
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
    <div css={rootStyle}>
      {todos.map((todo) => (
        <TodoCard key={todo.id} todo={todo} />
      ))}

      {hasNextPage && (
        <div ref={ref} css={loadMoreStyle}>
          loading...
        </div>
      )}
    </div>
  )
}

const rootStyle = css`
  display: flex;
  flex-direction: column;
  padding: 20px 20px 120px;

  & > *:not(:last-of-type) {
    margin-bottom: 16px;
  }
`

const loadMoreStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #a5a5a5;
`
