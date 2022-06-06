import { css } from '@emotion/react'
import { useCreateTodoMutation } from '@hooks/use-create-todo-mutation'
import { useInput } from '@hooks/use-input'
import React from 'react'

export type CreateTodoFormProps = {
  className?: string
}

export const CreateTodoForm: React.FC<CreateTodoFormProps> = (props) => {
  const { className } = props

  const { value, onChange, resetValue } = useInput()
  const { createTodo } = useCreateTodoMutation()

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    createTodo({ text: value })
    resetValue()
  }

  return (
    <form css={rootStyle} className={className} onSubmit={onSubmit}>
      <button type="submit" css={submitButtonStyle}>
        +
      </button>

      <input type="text" css={inputStyle} placeholder="새 할 일을 입력해주세요" value={value} onChange={onChange} />
    </form>
  )
}

const rootStyle = css`
  display: flex;
  align-items: center;
  padding: 20px;
`

const submitButtonStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
`

const inputStyle = css`
  width: 100%;
`
