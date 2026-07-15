import { site, siteOrigin } from '../data/site';

export default function Seo({
  title,
  description,
  path = '',
  noIndex = false,
  jsonLd,
}) {
  const pageTitle = title.includes(site.name) ? title : `${title} | ${site.name}`;
  const canonical = siteOrigin ? `${siteOrigin}${path.startsWith('/') ? path : `/${path}`}` : '';

  return (
    <>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
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

