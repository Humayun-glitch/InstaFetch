'use client';

import { useEffect } from 'react';

export default function StructuredData() {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "InstaFetch",
      "description": "Download Instagram videos instantly with InstaFetch. Fast, free, and simple Instagram video downloader.",
      "url": "https://instafetch.com",
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "creator": {
        "@type": "Organization",
        "name": "InstaFetch Team"
      },
      "featureList": [
        "Download Instagram videos",
        "Download Instagram reels",
        "Download Instagram stories",
        "No registration required",
        "Free to use",
        "High quality downloads"
      ]
    });
    
    document.head.appendChild(script);
    
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
}
