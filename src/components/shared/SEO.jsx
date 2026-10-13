import { Helmet } from 'react-helmet-async';

export default function SEO({ 
  title, 
  description = "Schneitec Property offers an exclusive collection of luxury properties, boutique resorts, and unforgettable hotel experiences in Cambodia.", 
  url = "https://schneitecproperty.vercel.app" 
}) {
  // This ensures every page title ends with " | Schneitec Property"
  const siteTitle = title ? `${title} | Schneitec Property` : "Schneitec Property";

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />

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