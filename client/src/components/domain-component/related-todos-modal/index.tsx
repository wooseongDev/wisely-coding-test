import { useRelatedTodoSelectList } from '@components/domain-component/related-todos-modal/hook'
import { useIntersection } from '@hooks/use-intersection'
import { Button, Center, Checkbox, Loader, Modal, MultiSelect, Paper, ScrollArea, Stack, Text } from '@mantine/core'
import React from 'react'

export type RelatedTodosModalProps = {
  isOpen: boolean
  onClose: () => void

  parentIds: number[]
  onChangeParentIds: (id: number) => React.ChangeEventHandler<HTMLInputElement>
}

export const RelatedTodosModal: React.FC<RelatedTodosModalProps> = (props) => {
  const { isOpen, onClose, parentIds, onChangeParentIds } = props
  const { todos, isError, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = useRelatedTodoSelectList()

  const isDefaultChecked = (id: number) => parentIds.includes(id)

  const [ref] = useIntersection(async (entry) => {
    if (!entry.isIntersecting) return
    if (isFetchingNextPage || !hasNextPage) return
    await fetchNextPage()
  })

  if (isError) return <div>Error</div>
  if (!todos || isLoading) return <div>Loading</div>

  return (
    <Modal centered title="먼저 작업 할 todo 선택" opened={isOpen} onClose={onClose} overflow="inside">
      <Stack>
        <MultiSelect
          disabled
          value={parentIds.map((id) => `#${id}`)}
          placeholder="먼저 작업 할 todo 를 선택해주세요"
          data={todos.map((todo) => `#${todo.id}`)}
        />

        <ScrollArea sx={{ height: 400 }}>
          <Stack>
            {todos.map((todo) => (
              <Paper key={todo.id} p="xs" sx={(theme) => ({ border: `1px solid ${theme.colors.gray[3]}` })}>
                <Stack spacing="xs">
                  <Checkbox
                    label={<Text color="indigo">#{todo.id}</Text>}
                    defaultChecked={isDefaultChecked(todo.id)}
                    onChange={onChangeParentIds(todo.id)}
                  />
                  <Text>{todo.text}</Text>
                </Stack>
              </Paper>
            ))}

            {hasNextPage && (
              <Center ref={ref}>
                <Loader size="sm" />
              </Center>
            )}
          </Stack>
        </ScrollArea>

        <Button onClick={onClose}>완료</Button>
      </Stack>
    </Modal>
  )
}
