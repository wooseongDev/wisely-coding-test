import { TodoCard } from '@components/domain-component/todo-card'
import { css } from '@emotion/react'
import { useIntersection } from '@hooks/use-intersection'
import { Center, Loader, Stack } from '@mantine/core'
import { GetOneTodoResponse } from '@tools/api/todo/get-one-todo'
import React from 'react'

export type TodoListProps = {
  todos: GetOneTodoResponse[]
  loadMore: () => void
  hasNextPage?: boolean
}

export const TodoList: React.FC<TodoListProps> = (props) => {
  const { todos, loadMore, hasNextPage } = props

  const [ref] = useIntersection(async (entry) => {
    if (!entry.isIntersecting) return
    await loadMore()
  })

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
