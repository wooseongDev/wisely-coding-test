import { css } from '@emotion/react'
import { useCreateTodoMutation } from '@hooks/use-create-todo-mutation'
import { useInput } from '@hooks/use-input'
import { ActionIcon, Group, Input } from '@mantine/core'
import React from 'react'
import { Plus } from 'tabler-icons-react'

export type CreateTodoFormProps = {
  className?: string
}

export const CreateTodoForm: React.FC<CreateTodoFormProps> = (props) => {
  const { className } = props

  const { value, onChange, reset } = useInput()
  const { createTodo } = useCreateTodoMutation()

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    createTodo({ text: value })
    reset()
  }

  return (
    <form css={rootStyle} className={className} onSubmit={onSubmit}>
      <Group sx={{ width: '100%' }} noWrap>
        <ActionIcon type="submit" size="xs">
          <Plus />
        </ActionIcon>

        <Input sx={{ width: '100%' }} placeholder="새 할 일을 입력해주세요" value={value} onChange={onChange} />
      </Group>
    </form>
  )
}

const rootStyle = css`
  display: flex;
  align-items: center;
  padding: 20px;
`
