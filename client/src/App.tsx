import { AppLayout } from '@components/app-layout'
import { CreateTodoForm } from '@components/create-todo-form'
import { TodoList } from '@components/todo-list'
import { css } from '@emotion/react'
import React from 'react'

export const App: React.FC = () => (
  <AppLayout>
    <CreateTodoForm css={topStyle} />

    <TodoList />
  </AppLayout>
)

const topStyle = css`
  position: sticky;
  top: 0;
  background-color: #ffffff;
  border-radius: 0 0 4px 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  z-index: 2;
`
