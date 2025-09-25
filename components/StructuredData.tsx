export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "InstaFetch",
    "description": "Fast, free, and simple Instagram video downloads",
    "url": "https://instafetch.app",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "creator": {
      "@type": "Organization",
      "name": "InstaFetch"
    },
    "featureList": [
      "Download Instagram videos",
      "Free service",
      "No registration required",
      "Fast processing",
      "High quality downloads"
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
