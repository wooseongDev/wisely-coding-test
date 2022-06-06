import { useState } from 'react'

export const useModal = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState)

  const onOpen = () => setIsOpen(true)
  const onClose = () => setIsOpen(false)
  const onToggle = () => setIsOpen((prev) => !prev)

  return {
    isOpen,
    onOpen,
    onClose,
    onToggle,
  }
}
