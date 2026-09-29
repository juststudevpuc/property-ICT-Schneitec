const galleryImage = (photoId, label) => ({
  src: `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=1200&q=85`,
  label,
});

export const projects = [
  {
    id: 1,
    title: "Modern Luxury Residence",
    category: "Residential",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      galleryImage("photo-1600607687939-ce8a6c25118c", "Exterior approach"),
      galleryImage("photo-1600210492486-724fe5c67fb0", "Living spaces"),
      galleryImage("photo-1600566753086-00f18fb6b3ea", "Material details"),
    ],
    overview:
      "A contemporary family home with a calm material palette, generous glazing, and spaces that feel connected to the outdoors.",
    designApproach:
      "The design balances clean architectural lines with warm natural finishes. Open living areas bring daylight into the heart of the home, while quieter private spaces offer a sense of retreat.",
    highlights: [
      "Open-plan living and dining",
      "Strong connection to the landscape",
      "Warm, restrained material palette",
    ],
  },
  {
    id: 2,
    title: "Contemporary Urban Villa",
    category: "Residential",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      galleryImage("photo-1600585154340-be6161a56a0c", "Street presence"),
      galleryImage("photo-1600210492486-724fe5c67fb0", "Interior spaces"),
      galleryImage("photo-1600566753086-00f18fb6b3ea", "Finishes and details"),
    ],
    overview:
      "A private urban home shaped around light, privacy, and a clear transition between shared and personal spaces.",
    designApproach:
      "A composed exterior gives the villa a confident presence on the street, while carefully placed openings draw daylight inside without sacrificing privacy.",
    highlights: [
      "Layered indoor and outdoor spaces",
      "Daylight-led interior planning",
      "A refined contemporary exterior",
    ],
  },
  {
    id: 3,
    title: "Minimalist Glass House",
    category: "Residential",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      galleryImage("photo-1600585154340-be6161a56a0c", "Glass facade"),
      galleryImage("photo-1600607687939-ce8a6c25118c", "Open living area"),
      galleryImage("photo-1600210492486-724fe5c67fb0", "Interior finishes"),
    ],
    overview:
      "A light-filled residence where glass, simple forms, and a close relationship with the surrounding landscape define the experience.",
    designApproach:
      "The architecture keeps its forms deliberately simple, allowing views, natural light, and subtle material details to do the work.",
    highlights: [
      "Expansive glazed surfaces",
      "Uncluttered architectural forms",
      "Views woven into daily living",
    ],
  },
  {
    id: 4,
    title: "Modern Commercial Building",
    category: "Commercial",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      galleryImage("photo-1497366216548-37526070297c", "Workplace interior"),
      galleryImage("photo-1497366754035-f200968a6e72", "Shared workspace"),
      galleryImage("photo-1511818966892-d7d671e672a2", "Architectural details"),
    ],
    overview:
      "A contemporary workplace landmark designed to give a clear identity to its surroundings and support flexible commercial use.",
    designApproach:
      "A legible structural rhythm and generous glazing create a balanced facade, bringing daylight into the building while giving it a distinct civic presence.",
    highlights: [
      "Clear, recognizable street presence",
      "Daylit interior workspaces",
      "Flexible commercial planning",
    ],
  },
  {
    id: 5,
    title: "Contemporary Office Headquarters",
    category: "Commercial",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      galleryImage("photo-1497366754035-f200968a6e72", "Collaborative spaces"),
      galleryImage("photo-1486406146926-c627a92ad1ab", "Building exterior"),
      galleryImage("photo-1497366811353-6870744d04b2", "Work settings"),
    ],
    overview:
      "A people-focused headquarters concept that brings collaboration, quiet work, and shared amenities into one coherent workplace.",
    designApproach:
      "The workplace is organized to make movement intuitive and encourage connection. A range of work settings supports different tasks throughout the day.",
    highlights: [
      "A mix of collaborative and quiet zones",
      "Intuitive circulation",
      "Shared spaces at the heart of the workplace",
    ],
  },
  {
    id: 6,
    title: "Luxury Courtyard Residence",
    category: "Residential",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      galleryImage("photo-1600585154340-be6161a56a0c", "Arrival and entry"),
      galleryImage("photo-1600607687939-ce8a6c25118c", "Courtyard living"),
      galleryImage("photo-1600566753086-00f18fb6b3ea", "Interior details"),
    ],
    overview:
      "A private residence organized around a sheltered courtyard that brings greenery and daylight into the center of the home.",
    designApproach:
      "The courtyard acts as both the visual center and a quiet outdoor room. Living spaces open toward it, creating a close connection to nature with a sense of privacy.",
    highlights: [
      "Sheltered central courtyard",
      "Private outdoor living",
      "Garden views from shared spaces",
    ],
  },
  {
    id: 7,
    title: "Modern Apartment Complex",
    category: "Residential",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      galleryImage("photo-1460317442991-0ec209397118", "Residential exterior"),
      galleryImage("photo-1600607687939-ce8a6c25118c", "Apartment interiors"),
      galleryImage("photo-1600210492486-724fe5c67fb0", "Shared living spaces"),
    ],
    overview:
      "A residential building concept that pairs efficient apartment planning with welcoming shared spaces and a strong street edge.",
    designApproach:
      "The massing is broken into a human-scaled composition, with balconies and shared outdoor areas adding depth and everyday connection to the exterior.",
    highlights: [
      "Efficient, livable apartment layouts",
      "Balconies and shared outdoor areas",
      "A welcoming pedestrian-level edge",
    ],
  },
  {
    id: 8,
    title: "Contemporary Cultural Center",
    category: "Institutional",
    image:
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      galleryImage("photo-1487958449943-2429e8be8625", "Public entrance"),
      galleryImage("photo-1511818966892-d7d671e672a2", "Exterior form"),
      galleryImage("photo-1497366754035-f200968a6e72", "Community spaces"),
    ],
    overview:
      "A public-facing cultural destination designed to make gathering, discovery, and community life part of the architecture.",
    designApproach:
      "A clear and welcoming entrance leads into flexible public spaces. The building's form gives the center a memorable identity while keeping it accessible and inviting.",
    highlights: [
      "A visible and welcoming entrance",
      "Flexible community gathering spaces",
      "Architecture with a distinct civic identity",
    ],
  },
];