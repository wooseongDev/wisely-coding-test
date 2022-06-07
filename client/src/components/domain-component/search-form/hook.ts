import { useDateInput } from '@hooks/use-date-input'
import { useInput } from '@hooks/use-input'
import { useState } from 'react'

const COMPLETE_STATE_MAPPER = {
  ALL: undefined,
  COMPLETE: 1,
  INCOMPLETE: 0,
}

export const completedRadioGroup = [
  {
    label: '전체',
    value: 'ALL',
  },
  {
    label: '완료',
    value: 'COMPLETE',
  },
  {
    label: '미완료',
    value: 'INCOMPLETE',
  },
]

const useCompletedRadio = () => {
  const [value, setValue] = useState<'ALL' | 'COMPLETE' | 'INCOMPLETE'>('ALL')

  const onChange = (value: string | null) => {
    if (value === null) return setValue('ALL')
    setValue(value as 'ALL' | 'COMPLETE' | 'INCOMPLETE')
  }

  const reset = () => {
    setValue('ALL')
  }

  return {
    value: COMPLETE_STATE_MAPPER[value],
    valueMap: value,
    onChange,
    reset,
  }
}

export const useSearchForm = () => {
  const { value: text, onChange: onChangeText, reset: resetText } = useInput('')

  const {
    value: isCompleted,
    valueMap: isCompletedValue,
    onChange: onChangeCompleted,
    reset: resetIsCompleted,
  } = useCompletedRadio()

  const {
    value: createdAt,
    valueDate: createdAtDate,
    onChange: onChangeCreatedAt,
    reset: resetCreateAt,
  } = useDateInput()

  const {
    value: updatedAt,
    valueDate: updatedAtDate,
    onChange: onChangeUpdatedAt,
    reset: resetUpdatedAt,
  } = useDateInput()

  const buildBody = () => ({
    text: text.length > 0 ? text : undefined,
    isCompleted,
    createdAt,
    updatedAt,
  })

  const resetAll = () => {
    resetText()
    resetIsCompleted()
    resetCreateAt()
    resetUpdatedAt()
  }

  return {
    buildBody,
    resetAll,

    text,
    onChangeText,

    isCompleted: isCompletedValue,
    onChangeCompleted,

    createdAt: createdAtDate,
    onChangeCreatedAt,

    updatedAt: updatedAtDate,
    onChangeUpdatedAt,
  }
}
