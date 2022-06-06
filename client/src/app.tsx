import { AppLayout } from '@components/layout-component/app-layout'
import { Main } from '@pages/main'
import { Search } from '@pages/search'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

export const App: React.FC = () => (
  <AppLayout>
    <Routes>
      <Route path="/search" element={<Search />} />
      <Route index element={<Main />} />
    </Routes>
  </AppLayout>
)
