import { useInput } from '@hooks/use-input'
import { useUpdateTodoMutation } from '@hooks/use-update-todo-mutation'
import { Button, Group, Modal, Stack, TextInput } from '@mantine/core'
import React from 'react'

export type EditTodoModalProps = {
  id: number
  text: string
  isOpen: boolean
  onClose: () => void
}

export const EditTodoModal: React.FC<EditTodoModalProps> = (props) => {
  const { id, text, isOpen, onClose } = props

  const { value, onChange, reset } = useInput(text)

  const { updateTodo } = useUpdateTodoMutation({ id })

  const onModalClose = () => {
    onClose()
    reset()
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    updateTodo({ text: value })
    onClose()
  }

  return (
    <Modal centered title={`#${id} 수정하기`} opened={isOpen} onClose={onModalClose}>
      <form onSubmit={onSubmit}>
        <Stack>
          <TextInput label="내용" placeholder={text} value={value} onChange={onChange} required />

          <Group grow>
            <Button variant="light" color="gray" onClick={onModalClose}>
              취소
            </Button>

            <Button type="submit">수정</Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  )
}
