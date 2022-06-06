import { Global } from '@emotion/react'
import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { NotificationsProvider } from '@mantine/notifications'
import { globalStyle, theme } from '@tools/styles/global-style'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'

import { App } from './App'

// todo emotion, mantine 과 의존성이 겹치는 이슈 해결해야 한다

const queryClient = new QueryClient()
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <NotificationsProvider position="top-center" autoClose={2000}>
          <ModalsProvider>
            <App />
            <Global styles={globalStyle} />
          </ModalsProvider>
        </NotificationsProvider>
      </MantineProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
