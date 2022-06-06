import { CreateTodoForm } from '@components/domain-component/create-todo-form'
import { TodoList } from '@components/domain-component/todo-list'
import { AppLayout } from '@components/layout-component/app-layout'
import { MAX_CONTENT_WIDTH_PX_UNIT, MIN_CONTENT_WIDTH_PX_UNIT } from '@constants/style.constant'
import { css } from '@emotion/react'
import React from 'react'

export const App: React.FC = () => (
  <AppLayout>
    <CreateTodoForm css={topStyle} />

    <TodoList />
  </AppLayout>
)

const topStyle = css`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0 auto;
  max-width: ${MAX_CONTENT_WIDTH_PX_UNIT};
  min-width: ${MIN_CONTENT_WIDTH_PX_UNIT};
  width: 100%;
  background-color: #ffffff;
  border-radius: 4px 4px 0 0;
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.08);
  z-index: 2;
`
