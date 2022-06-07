import { DateText } from '@components/base-component/date-text'
import { EditTodoModal } from '@components/domain-component/edit-todo-modal'
import { useDeleteTodoMutation } from '@hooks/use-delete-todo-mutation'
import { useModal } from '@hooks/use-modal'
import { useUpdateTodoMutation } from '@hooks/use-update-todo-mutation'
import { ActionIcon, Card, Checkbox, Group, Stack, Text } from '@mantine/core'
import { GetOneTodoResponse } from '@tools/api/todo/get-one-todo'
import React from 'react'
import { Pencil, Trash } from 'tabler-icons-react'

export type TodoCardProps = {
  todo: GetOneTodoResponse
}

export const TodoCard: React.FC<TodoCardProps> = (props) => {
  const { todo } = props
  const { id, text, isCompleted, parentTodos, createdAt, updatedAt } = todo

  const { isOpen, onOpen, onClose } = useModal()

  const { onDelete } = useDeleteTodoMutation({ id })
  const { updateIsCompleted } = useUpdateTodoMutation({
    id,
  })

  const onToggle = () => {
    updateIsCompleted(!isCompleted)
  }

  return (
    <>
      <Card shadow="sm" p="lg" radius="md">
        <Stack spacing="xs">
          <Group position="apart">
            <Checkbox label={`#${id}`} checked={isCompleted} onChange={onToggle} />

            <Group spacing="xs">
              <ActionIcon size="xs" onClick={onOpen}>
                <Pencil />
              </ActionIcon>

              <ActionIcon size="xs" color="red" onClick={onDelete}>
                <Trash />
              </ActionIcon>
            </Group>
          </Group>

          <Text
            component="h5"
            color={isCompleted ? 'dimmed' : undefined}
            sx={{ textDecoration: isCompleted ? 'line-through' : 'none' }}
          >
            {text}
          </Text>

          {parentTodos.length > 0 && (
            <Text size="xs" color="indigo">
              {parentTodos.map(({ parentId }) => `#${parentId}`).join(' ')}
            </Text>
          )}

          <div>
            <DateText date={createdAt} format="작성일 | YYYY-MM-DD" />
            <DateText date={updatedAt} format="최종수정일 | YYYY-MM-DD" />
          </div>
        </Stack>
      </Card>

      <EditTodoModal id={id} text={text} isOpen={isOpen} onClose={onClose} />
    </>
  )
}
