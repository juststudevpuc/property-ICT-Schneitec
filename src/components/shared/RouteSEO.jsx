import { useLocation } from "react-router-dom";
import { hotels } from "../../lib/hotels";
import { projects } from "../../lib/projects";
import SEO from "./SEO";

const SITE_URL = "https://schneitecproperty.vercel.app";

const pageMetadata = {
  "/": {
    title: "Luxury Homes & Architectural Design in Cambodia",
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

function getPageMetadata(pathname) {
  if (pageMetadata[pathname]) return pageMetadata[pathname];

  const hotelMatch = pathname.match(/^\/destinations\/([^/]+)$/);
  if (hotelMatch) {
    const hotel = hotels.find((item) => item.id === Number(hotelMatch[1]));
    if (hotel) {
      return {
        title: `${hotel.name} - Property in ${hotel.location}`,
        description: `${hotel.overview} Explore rooms, amenities, and property details at ${hotel.name}.`,
      };
    }
  }

  const projectMatch = pathname.match(/^\/projects\/([^/]+)$/);
  if (projectMatch) {
    const project = projects.find(
      (item) => item.id === Number(projectMatch[1]),
    );
    if (project) {
      return {
        title: `${project.title} - ${project.category} Architecture`,
        description: `${project.overview} Discover the design approach and architectural highlights of this Schneitec Property ${project.category.toLowerCase()} project.`,
      };
    }
  }

  return {
    title: "Property & Architecture Design",
    description:
      "Discover the Schneitec Property portfolio and architecture, with thoughtful residential design and distinctive places to stay.",
  };
}

export default function RouteSEO() {
  const { pathname } = useLocation();
  const { title, description } = getPageMetadata(pathname);

  return (
    <SEO
      title={title}
      description={description}
      url={`${SITE_URL}${pathname}`}
    />
  );
}
