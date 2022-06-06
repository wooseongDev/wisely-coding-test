import { CreateTodoForm } from '@components/domain-component/create-todo-form'
import { TodoList } from '@components/domain-component/todo-list'
import { MAX_CONTENT_WIDTH_PX_UNIT, MIN_CONTENT_WIDTH_PX_UNIT } from '@constants/style.constant'
import { css } from '@emotion/react'
import { useGetManyTodosInfiniteQuery } from '@hooks/use-get-many-todos-infinite-query'
import React from 'react'

export const Main = () => {
  const { todos, isError, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = useGetManyTodosInfiniteQuery()

  const loadMore = async () => {
    if (isFetchingNextPage || !hasNextPage) return
    await fetchNextPage()
  }

  if (isError) return <div>Error</div>
  if (!todos || isLoading) return <div>Loading</div>
  return (
    <>
      <TodoList todos={todos} hasNextPage={hasNextPage} loadMore={loadMore} />
      <CreateTodoForm css={topStyle} />
    </>
  )
}

const topStyle = css`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0 auto;
  max-width: ${MAX_CONTENT_WIDTH_PX_UNIT};
  min-width: ${MIN_CONTENT_WIDTH_PX_UNIT};
  width: 100%;
  background-color: #ffffff;
  border-radius: 4px 4px 0 0;
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.08);
  z-index: 2;
`
