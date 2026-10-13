'use client'

import { useLayoutEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from 'react'

type RevealState = 'idle' | 'pending' | 'shown'

interface RevealProps {
  as?: 'div' | 'li' | 'section' | 'article' | 'figure' | 'header'
  variant?: 'rise' | 'clip'
  /** Position inside a repeated group; drives the stagger delay. */
  index?: number
  className?: string
  style?: CSSProperties
  children: ReactNode
}

/**
 * Content is visible by default. Only if the element starts outside the viewport
 * is it marked pending, and it is revealed by its own IntersectionObserver entry.
 * There is no timer: an element that never enters view is never marked as shown.
 */
export function Reveal({ as = 'div', variant = 'rise', index = 0, className, style, children }: RevealProps) {
  const Tag = as as ElementType
  const ref = useRef<HTMLElement | null>(null)
  const [state, setState] = useState<RevealState>('idle')

  useLayoutEffect(() => {
    const element = ref.current
    if (!element) return
    if (typeof IntersectionObserver === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const rect = element.getBoundingClientRect()
    const alreadyVisible = rect.top < window.innerHeight * 0.92 && rect.bottom > 0
    if (alreadyVisible) return

    setState('pending')
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setState('shown')
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -6% 0px' },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      data-reveal={state}
      data-reveal-variant={variant}
      className={className}
      style={{ ...style, ['--reveal-index' as string]: index }}
    >
      {children}
    </Tag>
  )
}
