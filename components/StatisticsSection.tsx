'use client'

import { useEffect, useRef, useState } from 'react'

interface StatisticItem {
  value: number
  suffix: string
  label: string
}

interface StatisticsSectionProps {
  stats: StatisticItem[]
}

function useCountUp(end: number, duration: number, start: number = 0): number {
  const [count, setCount] = useState(start)
  const frameRef = useRef<number>()
  const startTimeRef = useRef<number>()

  useEffect(() => {
    const animate = (currentTime: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = currentTime
      }

      const elapsed = currentTime - startTimeRef.current
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const current = Math.floor(start + (end - start) * easeOutQuart)
      
      setCount(current)

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    frameRef.current = requestAnimationFrame(animate)

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [end, duration, start])

  return count
}

function AnimatedNumber({ value, suffix, isVisible, index }: { value: number; suffix: string; isVisible: boolean; index: number }) {
  // Different durations for each number to make them finish at different times
  // Base duration varies by value, plus an offset based on index
  const baseDuration = 1500 + (value * 3) // Larger numbers take longer
  const duration = baseDuration + (index * 300) // Each subsequent number takes a bit longer
  
  const count = useCountUp(isVisible ? value : 0, duration, 0)

  return (
    <span>
      {count}{suffix}
    </span>
  )
}

export default function StatisticsSection({ stats }: StatisticsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            // Disconnect after first trigger to prevent re-animation
            observer.disconnect()
          }
        })
      },
      {
        threshold: 0.3, // Trigger when 30% of the section is visible
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="relative bg-gradient-to-br from-primary-50 via-white to-primary-50 rounded-2xl shadow-no-offset overflow-hidden border border-primary-100 pulse-blue transition-all duration-300 p-3 sm:p-4 md:p-6 lg:p-8 text-center hover:-translate-y-1 min-h-[100px] sm:min-h-[120px] md:min-h-[140px] flex flex-col justify-center"
            >
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-primary-200/20 rounded-full -mr-12 sm:-mr-16 -mt-12 sm:-mt-16 blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-32 sm:h-32 bg-primary-300/20 rounded-full -ml-12 sm:-ml-16 -mb-12 sm:-mb-16 blur-2xl"></div>
              
              <div className="relative z-10">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-1 sm:mb-2 text-primary-600 leading-tight break-words">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} isVisible={isVisible} index={index} />
                </div>
                <div className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-700 font-medium leading-tight break-words px-1">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

