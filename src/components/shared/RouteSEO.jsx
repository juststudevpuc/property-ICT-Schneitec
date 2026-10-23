import { useLocation } from "react-router-dom";
import SEO from "./SEO";

const SITE_URL = "https://schneitec-property.ictcenter.blog";

const pageMetadata = {
  "/": {
    title: "Luxury Hotels & Architectural Design in Cambodia",
    description:
      "Explore Schneitec Property's Cambodia property collection and architecture-led approach to thoughtful, timeless residential design.",
  },
  "/about": {
    title: "About Our Property & Architecture Studio",
    description:
      "Learn about Schneitec Property, our property portfolio, and our approach to considered architecture, sustainable design, and exceptional places.",
  },
  "/portfolio": {
    title: "Residential & Commercial Architecture Portfolio",
    description:
      "Browse Schneitec Property's architecture portfolio, featuring contemporary residences, commercial buildings, and thoughtfully designed spaces.",
  },
  "/career": {
    title: "Architecture & Property Design Careers",
    description:
      "Explore career opportunities with Schneitec Property and help shape thoughtful residential, commercial, and community architecture.",
  },
  "/media": {
    title: "Property, Architecture & Design News",
    description:
      "Read the latest Schneitec Property news, architecture insights, studio updates, design awards, and press announcements.",
  },
  "/media/news": {
    title: "Architecture & Property News Archive",
    description:
      "Explore Schneitec Property news and perspectives on architecture, residential design, property projects, and sustainable places.",
  },
  "/contact": {
    title: "Contact Schneitec Property & Design",
    description:
      "Contact Schneitec Property about our properties, architectural design services, project enquiries, and studio collaborations.",
  },
  "/destinations": {
    title: "Luxury Property Destinations in Cambodia",
    description:
      "Explore Schneitec Property destinations in Cambodia, including refined city stays and boutique resort destinations designed around local character.",
  },
  "/experience": {
    title: "Property, Dining & Wellness Experiences",
    description:
      "Discover signature dining, wellness, and event experiences at Schneitec Property destinations, thoughtfully designed for memorable stays.",
  },
  "/offers": {
    title: "Property Stays & Hotel Offers",
    description:
      "Find current Schneitec Property stay offers and property packages for a considered escape at our distinctive destinations.",
  },
  "/feedback": {
    title: "Guest Feedback for Schneitec Property",
    description:
      "Share feedback about your Schneitec Property stay and help us improve our hospitality and guest experience.",
  },
  "/terms": {
    title: "Property Booking Terms & Conditions",
    description:
      "Review Schneitec Property terms and conditions for property reservations, booking changes, cancellations, and guest stays.",
  },
};

export default function RouteSEO() {
  const { pathname } = useLocation();
  
  // Default to general studio metadata for dynamic detail routes
  const metadata = pageMetadata[pathname] || {
    title: "Property & Architecture Design",
    description: "Discover Schneitec Property developments and architecture, featuring thoughtful design and distinctive places to stay.",
  };

  return (
    <SEO
      title={metadata.title}
      description={metadata.description}
      url={`${SITE_URL}${pathname}`}
    />
  );
}