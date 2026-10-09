const galleryImage = (photoId, label) => ({
  src: `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=1200&q=85`,
  label,
});

export const hotels = [
  {
    id: 1,
    name: "The Hearth Phnom Penh",
    category: "City Center",
    location: "Phnom Penh, Cambodia",
    image: "https://images.unsplash.com/photo-1542314831-c6a4d27de22f?auto=format&fit=crop&w=1200&q=85",
    gallery: [
      galleryImage("photo-1578683010236-d716f9a3f461", "Luxury Suite"),
      galleryImage("photo-1582719508461-905c673771fd", "Rooftop Pool"),
      galleryImage("photo-1514933651103-005eec06c04b", "Fine Dining Restaurant"),
    ],
    overview: "A sanctuary of luxury in the heart of the capital. The Hearth Phnom Penh blends timeless elegance with modern comfort, offering breathtaking city views and world-class culinary experiences.",
    description: "Designed for the discerning traveler, our flagship property features expansive suites, a restorative wellness spa, and an infinity pool overlooking the Mekong River. Every detail is curated to provide an unforgettable stay.",
    amenities: ["Signature Spa", "Infinity Pool", "Michelin-starred Dining", "24/7 Butler Service"],
    startingRate: 250,
  },
  {
    id: 2,
    name: "Hearth River Retreat Kampot",
    category: "Resort",
    location: "Kampot, Cambodia",
    image: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=1200&q=85",
    gallery: [
      galleryImage("photo-1499793983690-e29da59ef1c2", "River View Villa"),
      galleryImage("photo-1540555700478-4be289fbecef", "Wellness Spa"),
      galleryImage("photo-1566073771259-6a8506099945", "Lounge Area"),
    ],
    overview: "Nestled along the tranquil Kampot River, this boutique resort offers a peaceful escape surrounded by lush tropical gardens and historic French colonial architecture.",
    description: "Awaken to the sound of nature in our private riverfront villas. Indulge in authentic local flavors at our riverside restaurant, or unwind with holistic treatments at our award-winning spa sanctuary.",
    amenities: ["Private Villas", "Riverfront Dining", "Holistic Spa", "Sunset Cruises"],
    startingRate: 180,
  }
];