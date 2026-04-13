/** Site-wide constants — edit for production (RERA, URLs, analytics). */
export const site = {
  name: 'Sky49',
  fullName: 'The SKY 49 by Ananda Prosper',
  title:
    'Sky49 Hyderabad | Ultra-Luxury 3 & 4 BHK Apartments in Tellapur, Osman Nagar',
  description:
    'Sky49 Tellapur offers G+49 ultra-luxury 3 & 4 BHK apartments across 4 towers with 1 lakh+ sq ft amenities, RERA-approved. Book a site visit in Hyderabad’s elite growth corridor.',
  url: import.meta.env.PUBLIC_SITE_URL || 'https://www.thesky49.com',
  locale: 'en_IN',
  phone: '+91 8790066990',
  phoneTel: '+918790066990',
  email: 'sales@thesky49.com',
  whatsapp: '918790066990',
  address: {
    streetAddress: 'Osman Nagar, Tellapur',
    addressLocality: 'Hyderabad',
    addressRegion: 'Telangana',
    postalCode: '502032',
    addressCountry: 'IN',
  },
  geo: { lat: 17.44441060115836, lng: 78.27522347594073 },
  /** Confirm on Telangana RERA portal before purchase. */
  rera: 'Telangana RERA — verify registration ID on the official portal',
  builder: 'Ananda Prosper',
  mapEmbedSrc:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.3196016508928!2d78.27522347594073!3d17.44441060115836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcbed17e91b4b4b%3A0x19787397a2d26a29!2sThe%20SKY%2049%20by%20Ananda%20Prosper!5e0!3m2!1sen!2sin!4v1775729985100!5m2!1sen!2sin',
  youtubeWalkthroughId: 'I5DbiUkT05M',
  heroImage: {
    src: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1920&q=80',
    width: 1920,
    height: 1080,
    alt:
      'Sky49 Tellapur ultra-luxury 3 and 4 BHK apartment towers in Hyderabad',
  },
  ogImage: '/og-sky49.jpg',
  sameAs: [] as string[],
} as const;

export const stats = [
  { label: 'Floors', value: 'G+49' },
  { label: 'Towers', value: '4' },
  { label: 'Amenities', value: '1 lakh+ sq ft' },
  { label: 'Compliance', value: 'RERA approved' },
] as const;

export const proximityRows = [
  {
    destination: 'ORR (Outer Ring Road)',
    time: '~10–15 min',
    note: 'Seamless city-wide connectivity',
  },
  {
    destination: 'Neopolis / Kokapet corridor',
    time: '~12–18 min',
    note: 'Premium office & lifestyle cluster',
  },
  {
    destination: 'Financial District / Gachibowli',
    time: '~15–20 min',
    note: 'Major IT & financial hubs',
  },
  {
    destination: 'Rajiv Gandhi International Airport',
    time: '~35–45 min',
    note: 'Via ORR depending on traffic',
  },
] as const;

export const quickFactsRows = [
  { label: 'Project', value: 'Sky49 (The SKY 49)' },
  { label: 'Builder', value: site.builder },
  { label: 'Towers', value: '4 premium towers' },
  { label: 'Floors', value: 'G+49 per tower (indicative)' },
  { label: 'Unit mix', value: '3 BHK & 4 BHK ultra-luxury residences' },
  { label: 'Total amenities area', value: '1 lakh+ sq ft (indicative)' },
  { label: 'Location', value: 'Osman Nagar, Tellapur, Hyderabad' },
  { label: 'Possession', value: 'As per current construction milestone — confirm on call' },
  { label: 'RERA', value: site.rera },
  { label: 'Home loan', value: 'Assistance available with leading banks (T&C)' },
] as const;

/** Optional Instagram reel embed URLs (full embed iframe src). Leave empty to show CTA cards. */
export const instagramReelEmbeds: string[] = [];

export const instagramProfile = 'https://www.instagram.com/';
