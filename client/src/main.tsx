import { Global } from '@emotion/react'
import { globalStyle } from '@tools/styles/global-style'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'

import { App } from './App'

const queryClient = new QueryClient()
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <Global styles={globalStyle} />
    </QueryClientProvider>
  </React.StrictMode>
)
