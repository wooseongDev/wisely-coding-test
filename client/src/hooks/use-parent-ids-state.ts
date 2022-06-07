import React, { useState } from 'react'

export const useParentIdsState = (initialState: number[] = []) => {
  const [value, setValue] = useState(initialState)

  const buildOnChange =
    (id: number): React.ChangeEventHandler<HTMLInputElement> =>
    (e) => {
      const { checked } = e.currentTarget

      if (!checked) {
        setValue((prev) => prev.filter((v) => v !== id))
        return
      }
      const hasValue = value.includes(id)
      if (hasValue) return
      setValue((prev) => [...prev, id])
    }

  const reset = () => {
    setValue(initialState)
  }

  return {
    value,
    buildOnChange,
    reset,
  }
}
