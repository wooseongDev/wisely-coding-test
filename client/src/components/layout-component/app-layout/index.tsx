import { MAX_CONTENT_WIDTH_PX_UNIT, MIN_CONTENT_WIDTH_PX_UNIT } from '@constants/style.constant'
import { css } from '@emotion/react'
import React from 'react'

export type AppLayoutProps = {
  children: React.ReactNode
}

export const AppLayout: React.FC<AppLayoutProps> = (props) => {
  const { children } = props

  return <main css={rootStyle}>{children}</main>
}

const rootStyle = css`
  margin: 0 auto;
  max-width: ${MAX_CONTENT_WIDTH_PX_UNIT};
  min-width: ${MIN_CONTENT_WIDTH_PX_UNIT};
  min-height: 100vh;
  width: 100%;
`
