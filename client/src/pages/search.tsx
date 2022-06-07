import { TodoList } from '@components/domain-component/todo-list'
import { useSearchTodoInfiniteQuery } from '@hooks/use-search-todo-infinite-query'
import { Center, Stack, Text } from '@mantine/core'
import React from 'react'

export const Search: React.FC = () => {
  const { total, todos, isError, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useSearchTodoInfiniteQuery()

  const loadMore = async () => {
    if (isFetchingNextPage || !hasNextPage) return
    await fetchNextPage()
  }

  if (isError) return <div>Error</div>
  if (!todos || isLoading) return <div>Loading</div>
  if (todos.length === 0) {
    return (
      <Center>
        <Text>검색결과가 없습니다</Text>
      </Center>
    )
  }
  return (
    <Stack spacing="xs">
      <Center>
        <Text color="gray" size="xs">
          총 {total}개의 검색 결과
        </Text>
      </Center>

      <TodoList todos={todos} hasNextPage={hasNextPage} loadMore={loadMore} />
    </Stack>
  )
}
