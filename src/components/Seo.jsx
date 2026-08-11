import { site, siteOrigin } from '../data/site';

const DEFAULT_OG_IMAGE = `${siteOrigin || site.website}/og-share.jpg`;

export default function Seo({
  title,
  description,
  path = '',
  noIndex = false,
  jsonLd,
  image,
}) {
  const pageTitle = title.includes(site.name) ? title : `${title} | ${site.name}`;
  const canonical = siteOrigin ? `${siteOrigin}${path.startsWith('/') ? path : `/${path}`}` : '';
  const ogImage = image || DEFAULT_OG_IMAGE;

  return (
    <>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      {canonical && <link rel="canonical" href={canonical} />}
      {canonical && <meta property="og:url" content={canonical} />}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd).replaceAll('<', '\\u003c')}
        </script>
      )}
    </>
  );
}
