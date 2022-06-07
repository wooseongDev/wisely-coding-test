import { useEffect, useRef, useState } from 'react'

export const useIntersection = <T extends HTMLElement = HTMLElement>(
  callback: (entry: IntersectionObserverEntry) => void,
  options?: IntersectionObserverInit
) => {
  const observer = useRef<IntersectionObserver | null>(null)
  const [element, setElement] = useState<T | null>(null)

  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect()
      observer.current = null
    }
    if (element === null) return

    observer.current = new IntersectionObserver(([entry]) => {
      callback(entry)
    }, options)
    observer.current.observe(element)

    return () => {
      if (element && observer.current) observer.current.unobserve(element)
    }
  }, [element, callback, options])

  return [setElement] as const
}
