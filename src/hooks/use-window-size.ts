import { useState, useEffect } from 'react'
import debounce from 'lodash.debounce'

export interface WindowSize {
  width: number;
  height: number;
}

export function useWindowSize(): WindowSize {
  function getSize(): WindowSize {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    }
  }

  const [windowSize, setWindowSize] = useState<WindowSize>(getSize);
  const updateWindowSize = debounce(setWindowSize, 1000)
  useEffect(() => {
    function handleResize(): void {
      updateWindowSize(getSize())
    }
    window.addEventListener('resize', handleResize)
    return (): void => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize;
}
