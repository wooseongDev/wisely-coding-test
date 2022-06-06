import React, { useState } from 'react'

export const useInput = (initialState = '') => {
  const [value, setValue] = useState(initialState)

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value)
  }

  const resetValue = () => {
    setValue(initialState)
  }

  return {
    value,
    onChange,
    resetValue,
  }
}
