'use client';

import { useEffect, useRef, useState } from 'react';

interface AdSenseAdProps {
  slot: string;
  format?: string;
  responsive?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

export default function AdSenseAd({ 
  slot, 
  format = 'auto', 
  responsive = true, 
  style,
  className = ''
}: AdSenseAdProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const loadAd = () => {
      try {
        // Check if adsbygoogle is available and container has dimensions
        if (typeof window !== 'undefined' && (window as any).adsbygoogle && adRef.current) {
          const container = adRef.current;
          const rect = container.getBoundingClientRect();
          
          // Only load ad if container has proper dimensions
          if (rect.width > 0 && rect.height > 0) {
            // Clear any existing ads in this slot
            const existingAd = container.querySelector('.adsbygoogle');
            if (existingAd) {
              existingAd.remove();
            }
            
            // Create new ad element
            const adElement = document.createElement('ins');
            adElement.className = 'adsbygoogle';
            adElement.style.display = 'block';
            adElement.style.width = '100%';
            adElement.style.height = '250px';
            adElement.setAttribute('data-ad-client', 'ca-pub-XXXXXXXXX'); // Replace with your actual AdSense client ID
            adElement.setAttribute('data-ad-slot', slot);
            adElement.setAttribute('data-ad-format', format);
            adElement.setAttribute('data-full-width-responsive', responsive.toString());
            
            container.appendChild(adElement);
            
            // Wait a bit more before pushing to ensure element is fully rendered
            setTimeout(() => {
              try {
                ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
                setIsLoaded(true);
              } catch (pushError) {
                console.error('AdSense push error:', pushError);
                setHasError(true);
              }
            }, 100);
          } else {
            // Retry after a short delay if container doesn't have dimensions yet
            setTimeout(loadAd, 200);
          }
        }
      } catch (err) {
        console.error('AdSense error:', err);
        setHasError(true);
      }
    };

    // Delay initial load to ensure DOM is ready
    const timer = setTimeout(loadAd, 1000);
    
    return () => clearTimeout(timer);
  }, [slot, format, responsive]);

  // Retry loading if container size changes
  useEffect(() => {
    if (!isLoaded && !hasError && adRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          if (entry.contentRect.width > 0 && entry.contentRect.height > 0) {
            const loadAd = () => {
              try {
                if (typeof window !== 'undefined' && (window as any).adsbygoogle && adRef.current) {
                  const container = adRef.current;
                  const existingAd = container.querySelector('.adsbygoogle');
                  if (!existingAd) {
                    const adElement = document.createElement('ins');
                    adElement.className = 'adsbygoogle';
                    adElement.style.display = 'block';
                    adElement.style.width = '100%';
                    adElement.style.height = '250px';
                    adElement.setAttribute('data-ad-client', 'ca-pub-XXXXXXXXX');
                    adElement.setAttribute('data-ad-slot', slot);
                    adElement.setAttribute('data-ad-format', format);
                    adElement.setAttribute('data-full-width-responsive', responsive.toString());
                    
                    container.appendChild(adElement);
                    
                    setTimeout(() => {
                      try {
                        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
                        setIsLoaded(true);
                      } catch (pushError) {
                        console.error('AdSense retry push error:', pushError);
                        setHasError(true);
                      }
                    }, 100);
                  }
                }
              } catch (err) {
                console.error('AdSense retry error:', err);
                setHasError(true);
              }
            };
            loadAd();
          }
        }
      });

      if (adRef.current) {
        resizeObserver.observe(adRef.current);
      }

      return () => resizeObserver.disconnect();
    }
  }, [isLoaded, hasError, slot, format, responsive]);

  return (
    <div 
      ref={adRef}
      className={`ad-container ${className}`} 
      style={{
        minHeight: '250px',
        minWidth: '300px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style
      }}
    >
      {!isLoaded && !hasError && (
        <div className="text-gray-400 text-sm text-center">
          <div className="animate-pulse">Loading advertisement...</div>
        </div>
      )}
      {hasError && (
        <div className="text-gray-400 text-sm text-center">
          Advertisement unavailable
        </div>
      )}
      {/* AdSense compliance notice */}
      <div className="sr-only" aria-label="Advertisement">
        This is an advertisement space
      </div>
    </div>
  );
}