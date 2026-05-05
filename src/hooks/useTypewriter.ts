import { useState, useEffect, useRef, useCallback } from 'react'

interface UseTypewriterOptions {
  text: string
  speed: number
  enabled: boolean
  onComplete?: () => void
}

export function useTypewriter({ text, speed, enabled, onComplete }: UseTypewriterOptions) {
  const [displayedText, setDisplayedText] = useState('')
  const indexRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const reset = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    indexRef.current = 0
    setDisplayedText('')
  }, [])

  useEffect(() => {
    if (!enabled) {
      reset()
      return
    }

    indexRef.current = 0
    setDisplayedText('')

    timerRef.current = setInterval(() => {
      indexRef.current += 1
      if (indexRef.current > text.length) {
        if (timerRef.current) {
          clearInterval(timerRef.current)
          timerRef.current = null
        }
        onComplete?.()
        return
      }
      setDisplayedText(text.slice(0, indexRef.current))
    }, speed)

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }, [text, speed, enabled, onComplete, reset])

  return { displayedText, reset }
}
