import { useEffect, RefObject, useCallback } from 'react'
import throttle from 'lodash.throttle'

export function useElementScroll(
  ref: RefObject<Element> | null,
  callback: (event: Event) => void,
): void {
  const handleScroll = useCallback(throttle((e: Event) => {
    callback(e)
  }, 1000), [callback])
  useEffect(() => {
    if (!ref || (ref && !ref.current)) {
      return
    }
    const node = ref.current!
    node.addEventListener('scroll', handleScroll)
    return node.addEventListener('scroll', handleScroll)
  }, [ref && ref.current])
}
