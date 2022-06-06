import { css } from '@emotion/react'
import dayjs from 'dayjs'
import React from 'react'

export type DateTextProps = {
  date: string | Date
  format?: string
}

export const DateText: React.FC<DateTextProps> = (props) => {
  const { date, format = 'YYYY-MM-DD' } = props
  const dateText = dayjs(date).format(format)

  return <p css={rootStyle}>{dateText}</p>
}

const rootStyle = css`
  font-size: 12px;
  font-weight: 400;
  color: #a5a5a5;
`
