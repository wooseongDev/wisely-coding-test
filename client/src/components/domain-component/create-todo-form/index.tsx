import { RelatedTodosModal } from '@components/domain-component/related-todos-modal'
import { css } from '@emotion/react'
import { useCreateTodoMutation } from '@hooks/use-create-todo-mutation'
import { useInput } from '@hooks/use-input'
import { useModal } from '@hooks/use-modal'
import { useParentIdsState } from '@hooks/use-parent-ids-state'
import { ActionIcon, Button, Group, Input } from '@mantine/core'
import React from 'react'
import { Plus } from 'tabler-icons-react'

export type CreateTodoFormProps = {
  className?: string
}

export const CreateTodoForm: React.FC<CreateTodoFormProps> = (props) => {
  const { className } = props

  const { isOpen, onOpen, onClose } = useModal()
  const { value: text, onChange: onChangeText, reset: resetText } = useInput()
  const { value: parentIds, buildOnChange: onChangeParentIds, reset: resetParentIds } = useParentIdsState()
  const { createTodo } = useCreateTodoMutation()

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    createTodo({ text, parentIds })
    resetText()
    resetParentIds()
  }

  return (
    <>
      <form css={rootStyle} className={className} onSubmit={onSubmit}>
        <Group sx={{ width: '100%' }} noWrap>
          <ActionIcon type="submit" size="xs">
            <Plus />
          </ActionIcon>

          <Input sx={{ width: '100%' }} placeholder="새 할 일을 입력해주세요" value={text} onChange={onChangeText} />

          <Button onClick={onOpen}>선행 작업</Button>
        </Group>
      </form>

      <RelatedTodosModal
        isOpen={isOpen}
        onClose={onClose}
        parentIds={parentIds}
        onChangeParentIds={onChangeParentIds}
      />
    </>
  )
}

const rootStyle = css`
  padding: 20px;
`
