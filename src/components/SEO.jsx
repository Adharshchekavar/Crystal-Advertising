import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'Crystal Advertising LLC';
const SITE_URL = 'https://crystaladvertising.ae';
const DEFAULT_IMG = `${SITE_URL}/og-image.jpg`;

// ── JSON-LD: Local Business (injected on every page) ──────────────────────────
const LOCAL_BUSINESS_LD = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#business`,
    name: SITE_NAME,
    alternateName: 'Crystal Advertising',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: DEFAULT_IMG,
    description:
        'Crystal Advertising LLC is a UAE-based end-to-end signage, branding and visual merchandising company established in 1994, serving clients across Ras Al Khaimah, Dubai and the wider GCC.',
    foundingDate: '1994',
    numberOfEmployees: { '@type': 'QuantitativeValue', value: 50 },
    telephone: '+971528588613',
    email: 'crystaladvertising777@gmail.com',
    address: {
        '@type': 'PostalAddress',
        streetAddress: 'Industrial Area',
        addressLocality: 'Ras Al Khaimah',
        addressRegion: 'Ras Al Khaimah',
        addressCountry: 'AE',
    },
    geo: {
        '@type': 'GeoCoordinates',
        latitude: 25.7895,
        longitude: 55.9432,
    },
    openingHoursSpecification: [
        {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            opens: '08:00',
            closes: '21:00',
        },
    ],
    sameAs: [
        'https://www.instagram.com/crystaladvertising__',
        'https://wa.me/00971528588613',
    ],
    priceRange: '$$',
    areaServed: ['Ras Al Khaimah', 'Dubai', 'Abu Dhabi', 'Sharjah', 'UAE', 'GCC'],
    hasMap: 'https://maps.google.com/?q=Crystal+Advertising+Ras+Al+Khaimah',
};

/**
 * Reusable SEO component.
 * Usage:
 *   <SEO
 *     title="Signage Solutions"
 *     description="Premium signage solutions in UAE…"
 *     path="/services/signage"
 *     breadcrumbs={[{ name: 'Services', url: '/services' }, { name: 'Signage', url: '/services/signage' }]}
 *     serviceSchema={{ name: 'Signage Solution', description: '…' }}
 *   />
 */
export default function SEO({
    title,
    description,
    path = '',
    image = DEFAULT_IMG,
    type = 'website',
    breadcrumbs = [],
    serviceSchema = null,
}) {
    const fullTitle = title
        ? `${title} | ${SITE_NAME}`
        : `${SITE_NAME} — The Complete Sign Solution`;
    const canonical = `${SITE_URL}${path}`;

    // ── BreadcrumbList ──
    const breadcrumbLD = breadcrumbs.length
        ? {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
                ...breadcrumbs.map((crumb, i) => ({
                    '@type': 'ListItem',
                    position: i + 2,
                    name: crumb.name,
                    item: `${SITE_URL}${crumb.url}`,
                })),
            ],
        }
        : null;

    // ── Service schema ──
    const serviceLD = serviceSchema
        ? {
            '@context': 'https://schema.org',
            '@type': 'Service',
            serviceType: serviceSchema.name,
            name: serviceSchema.name,
            description: serviceSchema.description,
            provider: { '@id': `${SITE_URL}/#business` },
            areaServed: 'UAE',
            url: canonical,
        }
        : null;

    return (
        <Helmet>
            {/* Primary */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={canonical} />
            <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

            {/* Open Graph */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={canonical} />
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:image" content={image} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:locale" content="en_AE" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* Geo / Business */}
            <meta name="geo.region" content="AE-RK" />
            <meta name="geo.placename" content="Ras Al Khaimah, UAE" />

            {/* JSON-LD Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(LOCAL_BUSINESS_LD)}
            </script>
            {breadcrumbLD && (
                <script type="application/ld+json">
                    {JSON.stringify(breadcrumbLD)}
                </script>
            )}
            {serviceLD && (
                <script type="application/ld+json">
                    {JSON.stringify(serviceLD)}
                </script>
            )}
        </Helmet>
    );
}
