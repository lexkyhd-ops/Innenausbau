export default function StructuredData() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://www.berishakg.at/#organization',
    name: 'Innenausbauberisha KG',
    legalName: 'Innenausbauberisha Kommanditgesellschaft',
    url: 'https://www.berishakg.at',
    logo: 'https://www.berishakg.at/images/LogoHouseSimple.png',
    image: 'https://www.berishakg.at/images/LogoHouseSimple.png',
    description: 'Professionelle Handwerksarbeiten für Spachteln, Malern und Terrassenbau in Wien.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Favoritenstraße 155 22-24',
      addressLocality: 'Wien',
      postalCode: '1100',
      addressCountry: 'AT',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 48.1812,
      longitude: 16.3745,
    },
    telephone: '+436641325995',
    email: 'kontakt@berishakg.at',
    priceRange: '$$',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
    ],
    areaServed: {
      '@type': 'City',
      name: 'Wien',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Handwerksleistungen',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Trockenbau',
            description: 'Professionelle Trockenbauarbeiten für perfekte Wände und Decken',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Malern',
            description: 'Innen- und Außenanstrich in höchster Qualität',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Terrassenbau',
            description: 'Individuelle Terrassen aus Holz',
          },
        },
      ],
    },
    sameAs: [],
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://www.berishakg.at/#website',
    url: 'https://www.berishakg.at',
    name: 'Innenausbauberisha KG',
    description: 'Professionelle Handwerksarbeiten für Spachteln, Malern und Terrassenbau in Wien',
    publisher: {
      '@id': 'https://www.berishakg.at/#organization',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://www.berishakg.at/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  )
}

