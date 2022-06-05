import { AppLayout } from '@components/app-layout'
import { TodoList } from '@components/todo-list'
import React from 'react'

export const App: React.FC = () => (
  <AppLayout>
    <TodoList />
  </AppLayout>
)
