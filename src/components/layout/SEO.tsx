import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

export const SEO: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  const title = t('seo.title', 'Panorama Trojmezí | Luxusní ubytování v Beskydech');
  const description = t('seo.description', 'Luxusní apartmány Panorama Trojmezí nabízí moderní ubytování v Beskydech s výhledem a wellness. Ideální místo pro relaxaci a hory.');
  const url = 'https://panorama-trojmezi.cz/';
  const brand = 'Panorama Trojmezí';

  // Structured Data (JSON-LD)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "name": brand,
    "description": description,
    "url": url,
    "telephone": "+420 733 643 831",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Dolní Lomná",
      "addressLocality": "Dolní Lomná",
      "postalCode": "739 91",
      "addressCountry": "CZ"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 49.5492,
      "longitude": 18.6631
    },
    "image": [
      `${url}og-image.jpg`
    ],
    "amenityFeature": [
      { "@type": "LocationFeatureSpecification", "name": "Sauna", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Free WiFi", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Parking", "value": true }
    ],
    "starRating": {
      "@type": "Rating",
      "ratingValue": "5"
    }
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <html lang={currentLang} />

      {/* hreflang for multilingual SEO */}
      <link rel="alternate" href={`${url}`} hrefLang="cs" />
      <link rel="alternate" href={`${url}?lang=en`} hrefLang="en" />
      <link rel="alternate" href={`${url}`} hrefLang="x-default" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};
