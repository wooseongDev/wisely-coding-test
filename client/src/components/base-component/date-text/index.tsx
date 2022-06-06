import { Text, useMantineTheme } from '@mantine/core'
import dayjs from 'dayjs'
import React from 'react'

export type DateTextProps = {
  date: string | Date
  format?: string
}

export const DateText: React.FC<DateTextProps> = (props) => {
  const { date, format = 'YYYY-MM-DD' } = props

  const theme = useMantineTheme()
  const dateText = dayjs(date).format(format)

  return (
    <Text size="xs" color={theme.colors.gray[5]}>
      {dateText}
    </Text>
  )
}
