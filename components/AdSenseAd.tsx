'use client'

import { useEffect } from 'react'

interface AdSenseAdProps {
  slot: string
  style?: React.CSSProperties
  format?: string
  responsive?: boolean
  className?: string
}

export function AdSenseAd({ 
  slot, 
  style = { display: 'block' }, 
  format = 'auto',
  responsive = true,
  className = ''
}: AdSenseAdProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({})
      }
    } catch (error) {
      console.log('AdSense not loaded:', error)
    }
  }, [])

  // Only render ads in production or when explicitly enabled
  if (process.env.NODE_ENV !== 'production' && !process.env.NEXT_PUBLIC_ADSENSE_ENABLED) {
    return (
      <div className={`bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center text-gray-500 ${className}`}>
        <p>AdSense Ad Placeholder</p>
        <p className="text-sm">Slot: {slot}</p>
      </div>
    )
  }

  return (
    <ins
      className={`adsbygoogle ${className}`}
      style={style}
      data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={responsive ? 'true' : 'false'}
    />
  )
}
