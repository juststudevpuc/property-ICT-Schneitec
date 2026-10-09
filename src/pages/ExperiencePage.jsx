import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const EXPERIENCES = [
  {
    id: 1,
    category: "Dining",
    title: "Culinary Excellence",
    description: "Savor exquisite dishes crafted by Michelin-starred chefs in an ambiance of refined luxury.",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    category: "Wellness",
    title: "The Spa Sanctuary",
    description: "Rejuvenate your mind and body with our holistic treatments and state-of-the-art wellness facilities.",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    category: "Events",
    title: "Unforgettable Gatherings",
    description: "From intimate celebrations to grand corporate galas, our spaces are designed to inspire.",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
  }
];

export default function ExperiencePage() {
  return (
    <main className="bg-[#f5f3ed] text-[#18392f]">
      <section className="relative isolate flex min-h-[70vh] items-center justify-center overflow-hidden bg-[#283c32] text-white">
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1800&q=80"
          alt="Luxury hotel experience"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-black/80 via-black/40 to-black/20" />
        <div className="mx-auto flex w-full max-w-7xl flex-col px-5 py-32 sm:px-7 lg:px-10">
          <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-[#d4af37] uppercase">
            Discover
          </p>
          <h1 className="m-0 max-w-2xl text-5xl leading-tight font-light sm:text-6xl lg:text-7xl">
            The Signature <br /> Experience
          </h1>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-7 lg:px-10 lg:py-28">
        <div className="mx-auto w-full max-w-7xl space-y-24">
          {EXPERIENCES.map((exp, index) => (
            <article 
              key={exp.id} 
              className={`grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-20 ${
                index % 2 !== 0 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className={`aspect-4/3 w-full overflow-hidden bg-neutral-200 ${index % 2 !== 0 ? "lg:order-2" : ""}`}>
                <img
                  src={exp.image}
                  alt={exp.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className={index % 2 !== 0 ? "lg:order-1" : ""}>
                <p className="text-[10px] font-semibold tracking-[0.2em] text-[#bc2525] uppercase">
                  {exp.category}
                </p>
                <h2 className="mt-4 text-3xl font-light text-neutral-900 sm:text-4xl">
                  {exp.title}
                </h2>
                <p className="mt-6 text-sm leading-relaxed text-[#56645b] sm:text-base">
                  {exp.description}
                </p>
                <Link to="/contact" className="mt-8 inline-flex items-center gap-2 border-b border-neutral-900 pb-1 text-xs font-bold tracking-[0.15em] uppercase transition-colors hover:border-[#bc2525] hover:text-[#bc2525]">
                  Enquire Now <ArrowRight size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}