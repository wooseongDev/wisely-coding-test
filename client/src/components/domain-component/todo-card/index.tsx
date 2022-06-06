import { DateText } from '@components/base-component/date-text'
import { css } from '@emotion/react'
import { useDeleteTodoMutation } from '@hooks/use-delete-todo-mutation'
import { useUpdateTodoMutation } from '@hooks/use-update-todo-mutation'
import { GetOneTodoResponse } from '@tools/api/todo/get-one-todo'
import React from 'react'

export type TodoCardProps = {
  todo: GetOneTodoResponse
}

export const TodoCard: React.FC<TodoCardProps> = (props) => {
  const { todo } = props
  const { id, text, isCompleted, parentTodos, createdAt, updatedAt } = todo

  const { onDelete } = useDeleteTodoMutation({ id })
  const { updateIsCompleted } = useUpdateTodoMutation({ id })

  return (
    <div css={rootStyle}>
      <div css={todoTopStyle}>
        <div css={checkboxWrapStyle}>
          <input
            css={checkboxStyle}
            type="checkbox"
            checked={isCompleted}
            onChange={() => updateIsCompleted(!isCompleted)}
          />
          <p css={checkboxTextStyle}>{`#${id}`}</p>
        </div>

        <button type="button" onClick={onDelete}>
          X
        </button>
      </div>

      <div>
        <h2 css={textStyle}>{text}</h2>
      </div>

      {parentTodos.length > 0 && (
        <div css={parentIdsTextStyle}>
          <p>{parentTodos.map(({ parentId }) => `#${parentId}`).join(' ')}</p>
        </div>
      )}

      <div>
        <DateText date={createdAt} format="작성일 | YYYY-MM-DD" />
        <DateText date={updatedAt} format="최종수정일 | YYYY-MM-DD" />
      </div>
    </div>
  )
}

const rootStyle = css`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.18);

  & > *:not(:last-of-type) {
    margin-bottom: 8px;
  }
`

const todoTopStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

const checkboxWrapStyle = css`
  display: flex;
  align-items: center;
`

const checkboxStyle = css`
  margin-right: 4px;
`

const checkboxTextStyle = css`
  font-size: 14px;
  font-weight: bold;
  color: #1a1919;
`

const textStyle = css`
  flex: 1;
  font-size: 16px;
  font-weight: 500;
  color: #1a1919;
`

const parentIdsTextStyle = css`
  font-size: 12px;
  color: #228be6;
`
