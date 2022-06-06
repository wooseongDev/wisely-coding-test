import { MAX_CONTENT_WIDTH_PX_UNIT, MIN_CONTENT_WIDTH_PX_UNIT } from '@constants/style.constant'
import { css } from '@emotion/react'

export const maxContentWidthCss = css`
  margin: 0 auto;
  max-width: ${MAX_CONTENT_WIDTH_PX_UNIT};
  min-width: ${MIN_CONTENT_WIDTH_PX_UNIT};
  width: 100%;
`
