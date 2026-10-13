'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Slide {
  id: string
  src: string
  alt: string
  eyebrow: string
  title: string
  body: string
  primary: { label: string; href: string }
  secondary: { label: string; href: string }
  copySide: 'left' | 'right'
  /** Desktop copy sits over the banner in white (dark artwork) or in navy (light artwork). */
  desktopTone: 'dark' | 'light'
  /** object-position from the banner layout plan for desktop. */
  focusDesktop: string
  /** object-position that keeps the product group inside the narrow crop. */
  focusMobile: string
}

const slides: Slide[] = [
  {
    id: 'pneumatic-systems',
    src: '/images/banners/banner-pneumatic-systems.jpg',
    alt: 'Pneumatic gauging instruments and measuring heads on a blue technical background',
    eyebrow: 'Pneumatic gauging systems',
    title: 'Pneumatic gauging, matched to your part',
    body: 'Float-type and digital gauges with measuring heads made to the bore or shaft on your drawing.',
    primary: { label: 'Browse Products', href: '/products' },
    secondary: { label: 'Request a Quote', href: '/contact' },
    copySide: 'right',
    desktopTone: 'dark',
    focusDesktop: '48% 50%',
    focusMobile: '8% 50%',
  },
  {
    id: 'calibration-standards',
    src: '/images/banners/banner-calibration-standards.jpg',
    alt: 'Precision steel ring and bearing components in front of a machining workshop',
    eyebrow: 'Precision calibration and standards',
    title: 'Rings and standards for accurate setting',
    body: 'Setting rings, plug gauges and external diameter standards to calibrate and verify your measuring tools.',
    primary: { label: 'Browse Standards', href: '/products/category/setting-rings-plug-gauges' },
    secondary: { label: 'Request a Quote', href: '/contact' },
    copySide: 'left',
    desktopTone: 'light',
    focusDesktop: '58% 50%',
    focusMobile: '88% 50%',
  },
  {
    id: 'inspection-fixtures',
    src: '/images/banners/banner-inspection-fixtures.jpg',
    alt: 'Illustrated precision probe assembly above a measuring base in an industrial workshop',
    eyebrow: 'Custom inspection fixtures',
    title: 'Inspection fixtures built around your drawing',
    body: 'Dedicated fixtures that locate the part and measure several features in one set-up, such as connecting rods.',
    primary: { label: 'View Fixtures', href: '/products/category/custom-inspection-fixtures' },
    secondary: { label: 'Request a Quote', href: '/contact' },
    copySide: 'right',
    desktopTone: 'dark',
    focusDesktop: '62% 50%',
    focusMobile: '15% 50%',
  },
]

const AUTOPLAY_MS = 7000

export function HeroCarousel() {
  const [index, setIndex] = useState(0)
  const [userPaused, setUserPaused] = useState(false)
  const [pointerInside, setPointerInside] = useState(false)
  const [focusInside, setFocusInside] = useState(false)
  const [onScreen, setOnScreen] = useState(true)
  const [reducedMotion, setReducedMotion] = useState(false)
  const rootRef = useRef<HTMLElement | null>(null)
  const touchStart = useRef<{ x: number; y: number } | null>(null)

  const total = slides.length
  const goTo = useCallback((next: number) => setIndex(((next % total) + total) % total), [total])

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(query.matches)
    const onChange = () => setReducedMotion(query.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    const element = rootRef.current
    if (!element || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { threshold: 0.35 })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const autoplay = !userPaused && !reducedMotion && !pointerInside && !focusInside && onScreen

  useEffect(() => {
    if (!autoplay) return
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % total), AUTOPLAY_MS)
    return () => window.clearInterval(timer)
  }, [autoplay, total, index])

  const manual = (next: number) => {
    setUserPaused(true)
    goTo(next)
  }

  const active = slides[index]

  return (
    <section
      ref={rootRef}
      aria-roledescription="carousel"
      aria-label="Featured product families"
      className="relative bg-white"
      onMouseEnter={() => setPointerInside(true)}
      onMouseLeave={() => setPointerInside(false)}
      onFocus={() => setFocusInside(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocusInside(false)
      }}
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight') {
          event.preventDefault()
          manual(index + 1)
        } else if (event.key === 'ArrowLeft') {
          event.preventDefault()
          manual(index - 1)
        }
      }}
    >
      <h1 className="sr-only">
        LUOQI Gauging: pneumatic gauges, calibration standards and custom inspection fixtures from Wuxi
      </h1>

      <div
        className="grid"
        aria-live={autoplay ? 'off' : 'polite'}
        onTouchStart={(event) => {
          const touch = event.touches[0]
          touchStart.current = { x: touch.clientX, y: touch.clientY }
        }}
        onTouchEnd={(event) => {
          const start = touchStart.current
          touchStart.current = null
          if (!start) return
          const touch = event.changedTouches[0]
          const dx = touch.clientX - start.x
          const dy = touch.clientY - start.y
          if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy)) manual(index + (dx < 0 ? 1 : -1))
        }}
      >
        {slides.map((slide, slideIndex) => {
          const isActive = slideIndex === index
          const dark = slide.desktopTone === 'dark'
          return (
            <div
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${slideIndex + 1} of ${total}`}
              aria-hidden={!isActive}
              inert={!isActive}
              data-active={isActive}
              className={cn(
                'col-start-1 row-start-1 flex flex-col transition-[opacity,visibility] duration-700 motion-reduce:transition-none lg:block lg:h-[clamp(30rem,40vw,43rem)]',
                isActive ? 'visible z-10 opacity-100' : 'invisible z-0 opacity-0',
              )}
            >
              <div
                className="relative h-72 overflow-hidden bg-navy sm:h-80 md:h-[26rem] lg:absolute lg:inset-0 lg:h-auto"
                style={
                  {
                    '--focus-mobile': slide.focusMobile,
                    '--focus-desktop': slide.focusDesktop,
                  } as React.CSSProperties
                }
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  priority={slideIndex === 0}
                  sizes="100vw"
                  className="object-cover [object-position:var(--focus-mobile)] lg:[object-position:var(--focus-desktop)]"
                />
                {slide.desktopTone === 'light' && (
                  <div
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 hidden w-[52%] bg-gradient-to-r from-white/85 via-white/60 to-transparent lg:block"
                  />
                )}
              </div>

              <div
                className={cn(
                  'relative flex flex-1 flex-col justify-center border-b border-rule bg-surface px-5 py-8 sm:px-8 lg:absolute lg:inset-0 lg:flex-none lg:border-0 lg:bg-transparent lg:p-0',
                )}
              >
                <div
                  className={cn(
                    'mx-auto flex w-full max-w-[90rem] lg:h-full lg:items-center lg:px-10',
                    slide.copySide === 'right' ? 'lg:justify-end' : 'lg:justify-start',
                  )}
                >
                  <div className={cn('max-w-xl lg:w-[42%] xl:w-[38%]', dark ? 'text-navy lg:text-white' : 'text-navy')}>
                    <div className="hero-rise flex items-center gap-3" style={{ '--i': 0 } as React.CSSProperties}>
                      <span className="hero-marker block h-0.5 w-10 bg-cyan" aria-hidden="true" />
                      <p
                        className={cn(
                          'font-mono text-xs font-medium uppercase tracking-[0.16em]',
                          dark ? 'text-link lg:text-cyan' : 'text-link',
                        )}
                      >
                        {String(slideIndex + 1).padStart(2, '0')} / {slide.eyebrow}
                      </p>
                    </div>
                    <h2
                      className="hero-rise mt-4 text-balance text-3xl font-semibold leading-[1.1] md:text-4xl xl:text-5xl"
                      style={{ '--i': 1 } as React.CSSProperties}
                    >
                      {slide.title}
                    </h2>
                    <p
                      className={cn(
                        'hero-rise mt-4 text-base leading-relaxed md:text-lg',
                        dark ? 'text-ink-muted lg:text-white/90' : 'text-ink-muted lg:text-ink',
                      )}
                      style={{ '--i': 2 } as React.CSSProperties}
                    >
                      {slide.body}
                    </p>
                    <div className="hero-rise mt-7 flex flex-wrap gap-3" style={{ '--i': 3 } as React.CSSProperties}>
                      <Link
                        href={slide.primary.href}
                        className={cn(
                          'inline-flex min-h-11 items-center justify-center border px-5 py-2.5 text-sm font-semibold transition-colors',
                          dark
                            ? 'border-navy bg-navy text-white hover:bg-navy-800 lg:border-white lg:bg-white lg:text-navy lg:hover:bg-cyan-soft'
                            : 'border-navy bg-navy text-white hover:bg-navy-800',
                        )}
                      >
                        {slide.primary.label}
                      </Link>
                      <Link
                        href={slide.secondary.href}
                        className={cn(
                          'inline-flex min-h-11 items-center justify-center border px-5 py-2.5 text-sm font-semibold transition-colors',
                          dark
                            ? 'border-navy bg-white text-navy hover:bg-surface lg:border-white lg:bg-transparent lg:text-white lg:hover:bg-white/10'
                            : 'border-navy bg-white text-navy hover:bg-surface',
                        )}
                      >
                        {slide.secondary.label}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="border-b border-rule bg-white px-5 py-3 sm:px-8 lg:pointer-events-none lg:absolute lg:inset-x-0 lg:bottom-6 lg:z-20 lg:border-0 lg:bg-transparent lg:p-0">
        <div
          className={cn(
            'mx-auto flex w-full max-w-[90rem] justify-center lg:px-10',
            active.copySide === 'right' ? 'lg:justify-end' : 'lg:justify-start',
          )}
        >
          <div className="pointer-events-auto inline-flex items-stretch border border-rule-strong bg-white">
            <button
              type="button"
              onClick={() => manual(index - 1)}
              className="inline-flex size-11 items-center justify-center text-navy hover:bg-surface"
            >
              <ChevronLeft className="size-5" aria-hidden="true" />
              <span className="sr-only">Previous slide</span>
            </button>
            <div className="flex items-center border-x border-rule">
              {slides.map((slide, dotIndex) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => manual(dotIndex)}
                  aria-current={dotIndex === index ? 'true' : undefined}
                  className="group/dot inline-flex h-11 w-10 items-center justify-center"
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      'block h-1 transition-all motion-reduce:transition-none',
                      dotIndex === index ? 'w-6 bg-navy' : 'w-3 bg-rule-strong group-hover/dot:bg-navy-700',
                    )}
                  />
                  <span className="sr-only">{`Go to slide ${dotIndex + 1}: ${slide.eyebrow}`}</span>
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => manual(index + 1)}
              className="inline-flex size-11 items-center justify-center text-navy hover:bg-surface"
            >
              <ChevronRight className="size-5" aria-hidden="true" />
              <span className="sr-only">Next slide</span>
            </button>
            {!reducedMotion && (
              <button
                type="button"
                onClick={() => setUserPaused((value) => !value)}
                className="inline-flex size-11 items-center justify-center border-l border-rule text-navy hover:bg-surface"
              >
                {userPaused ? (
                  <Play className="size-4" aria-hidden="true" />
                ) : (
                  <Pause className="size-4" aria-hidden="true" />
                )}
                <span className="sr-only">{userPaused ? 'Start automatic slideshow' : 'Pause automatic slideshow'}</span>
              </button>
            )}
            <span
              className="hidden items-center border-l border-rule px-3 font-mono text-xs text-ink-muted sm:inline-flex"
              aria-hidden="true"
            >
              {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
