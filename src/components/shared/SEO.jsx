import { Helmet } from 'react-helmet-async';

export default function SEO({ 
  title, 
  description = "Luxury properties and unforgettable hotel experiences by Hearth & Home.", 
  url = "https://schneitecproperty.vercel.app/"
}) {
  const siteTitle = `${title} | Hearth & Home`;

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* OpenGraph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}