import { Global } from '@emotion/react'
import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { NotificationsProvider } from '@mantine/notifications'
import { globalStyle, theme } from '@tools/styles/global-style'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom'

import { App } from './app'

// todo emotion, mantine 과 의존성이 겹치는 이슈 해결해야 한다

const queryClient = new QueryClient()
const Provider: React.FC<{ children: React.ReactNode }> = (props) => {
  const { children } = props

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <NotificationsProvider position="top-center" autoClose={2000}>
          <ModalsProvider>
            {children}
            <Global styles={globalStyle} />
          </ModalsProvider>
        </NotificationsProvider>
      </MantineProvider>
    </QueryClientProvider>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
)
