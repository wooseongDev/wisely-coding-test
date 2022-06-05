import { css } from '@emotion/react'

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
    font-family: 'Pretendard Variable', -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue',
      'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji',
      'Segoe UI Symbol', sans-serif;

    * {
      box-sizing: inherit;
      font-family: inherit;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-rendering: optimizeLegibility;
    }
  }

  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  a,
  button,
  input {
    margin: 0;
    padding: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }

  button {
    cursor: pointer;
  }

  button,
  input {
    border: none;
    outline: none;
    background-color: transparent;

    &:disabled {
      cursor: not-allowed;
    }
  }
`
