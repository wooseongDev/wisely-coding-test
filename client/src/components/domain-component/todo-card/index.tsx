import { DateText } from '@components/base-component/date-text'
import { useDeleteTodoMutation } from '@hooks/use-delete-todo-mutation'
import { useUpdateTodoMutation } from '@hooks/use-update-todo-mutation'
import { ActionIcon, Card, Checkbox, Group, Stack, Text, Title } from '@mantine/core'
import { GetOneTodoResponse } from '@tools/api/todo/get-one-todo'
import React, { useState } from 'react'
import { Pencil, Trash } from 'tabler-icons-react'

export type TodoCardProps = {
  todo: GetOneTodoResponse
}

export const TodoCard: React.FC<TodoCardProps> = (props) => {
  const { todo } = props
  const { id, text, isCompleted, parentTodos, createdAt, updatedAt } = todo

  const [isCompletedValue, setIsCompletedValue] = useState(isCompleted)

  const { onDelete } = useDeleteTodoMutation({ id })
  const { updateIsCompleted } = useUpdateTodoMutation({
    id,
    onSuccess: ({ isCompleted }) => {
      if (isCompleted !== undefined) setIsCompletedValue(isCompleted)
    },
  })

  const onToggle = () => {
    updateIsCompleted(!isCompletedValue)
  }

  return (
    <Card shadow="sm" p="lg" radius="md">
      <Stack spacing="xs">
        <Group position="apart">
          <Checkbox label={`#${id}`} checked={isCompletedValue} onChange={onToggle} />

          <Group spacing="xs">
            <ActionIcon size="xs">
              <Pencil />
            </ActionIcon>

            <ActionIcon size="xs" color="red" onClick={onDelete}>
              <Trash />
            </ActionIcon>
          </Group>
        </Group>

        <Title order={5}>{text}</Title>

        {parentTodos.length > 0 && (
          <Text size="xs" color="blue">
            {parentTodos.map(({ parentId }) => `#${parentId}`).join(' ')}
          </Text>
        )}

        <div>
          <DateText date={createdAt} format="작성일 | YYYY-MM-DD" />
          <DateText date={updatedAt} format="최종수정일 | YYYY-MM-DD" />
        </div>
      </Stack>
    </Card>
  )
}
