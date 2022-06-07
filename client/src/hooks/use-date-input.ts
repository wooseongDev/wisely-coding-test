import { DatePickerProps } from '@mantine/dates'
import { dayjs, newDate } from '@tools/util/dayjs.util'
import { useState } from 'react'

type Args = {
  initialState?: Date | string
  format?: string
}

export const useDateInput = (args: Args = {}) => {
  const { initialState, format = 'YYYY-MM-DD' } = args

  const getInitialState = () => (initialState ? dayjs(initialState).format(format) : undefined)
  const [value, setValue] = useState<string | undefined>(getInitialState())

  const valueDate = value ? newDate(value) : undefined

  const onChange: DatePickerProps['onChange'] = (date) => {
    if (date === null) return setValue(undefined)
    setValue(dayjs(date).format(format))
  }

  const reset = () => {
    setValue(getInitialState())
  }

  return {
    value,
    valueDate,
    onChange,
    reset,
  }
}
