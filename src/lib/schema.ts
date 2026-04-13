import type { FaqItem } from '../data/faq';
import { site } from '../data/site';

const address = site.address;

export function buildJsonLd(opts: {
  canonical: string;
  faq: FaqItem[];
  videoId: string;
  heroImageUrl: string;
}) {
  const { canonical, faq, videoId, heroImageUrl } = opts;

  const organization: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.fullName,
    url: site.url,
    logo: `${site.url}/favicon.svg`,
    email: site.email,
    telephone: site.phone,
  };
  if (site.sameAs.length > 0) {
    organization.sameAs = site.sameAs;
  }

  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: site.fullName,
    image: heroImageUrl,
    '@id': `${canonical}#localbusiness`,
    url: canonical,
    telephone: site.phone,
    email: site.email,
    priceRange: '$$$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.streetAddress,
      addressLocality: address.addressLocality,
      addressRegion: address.addressRegion,
      postalCode: address.postalCode,
      addressCountry: address.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
  };

  const apartmentComplex = {
    '@context': 'https://schema.org',
    '@type': 'ApartmentComplex',
    name: `${site.name} Tellapur — Ultra-Luxury Residences`,
    description: site.description,
    url: canonical,
    image: heroImageUrl,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.streetAddress,
      addressLocality: address.addressLocality,
      addressRegion: address.addressRegion,
      postalCode: address.postalCode,
      addressCountry: address.addressCountry,
    },
    numberOfAccommodationUnits: {
      '@type': 'QuantitativeValue',
      name: 'Multiple luxury units across towers',
    },
  };

  const realEstateAgent = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: `${site.fullName} Sales`,
    image: heroImageUrl,
    url: canonical,
    telephone: site.phone,
    email: site.email,
    areaServed: {
      '@type': 'City',
      name: 'Hyderabad',
    },
    parentOrganization: {
      '@type': 'Organization',
      name: site.builder,
    },
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: site.url,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Sky49 Hyderabad',
        item: canonical,
      },
    ],
  };

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  const videoObject = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: 'Sky49 Hyderabad — project walkthrough',
    description:
      'Walkthrough and lifestyle context for Sky49 Tellapur ultra-luxury apartments.',
    thumbnailUrl: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
    uploadDate: '2025-01-01',
    contentUrl: `https://www.youtube.com/watch?v=${videoId}`,
    embedUrl: `https://www.youtube.com/embed/${videoId}`,
  };

  const imageObject = {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    contentUrl: heroImageUrl,
    name: site.heroImage.alt,
    description: site.heroImage.alt,
    license: canonical,
    creditText: site.fullName,
    creator: { '@type': 'Organization', name: site.builder },
  };

  return [
    organization,
    localBusiness,
    apartmentComplex,
    realEstateAgent,
    breadcrumb,
    faqPage,
    videoObject,
    imageObject,
  ];
}
