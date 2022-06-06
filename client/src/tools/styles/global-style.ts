import { css } from '@emotion/react'
import { MantineThemeOverride } from '@mantine/styles/lib/theme/types'

export const theme: MantineThemeOverride = {
  fontFamily: `'Pretendard Variable', -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue',
      'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji',
      'Segoe UI Symbol', sans-serif`,
}

export const globalStyle = css`
  html,
  body {
    margin: 0;
    padding: 0;
  }

  body {
    background-color: #f6f6f6;
    box-sizing: border-box;
    font-size: 16px;
    font-weight: 400;

    * {
      box-sizing: inherit;
      font-family: inherit;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-rendering: optimizeLegibility;
    }
  }
`
