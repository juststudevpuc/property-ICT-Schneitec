import { ArrowDownRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { hotels } from "../lib/hotels";

const categories = ["All Destinations", "City Center", "Resort"];

export default function DestinationsPage() {
  const [activeCategory, setActiveCategory] = useState("All Destinations");
  const filteredHotels =
    activeCategory === "All Destinations"
      ? hotels
      : hotels.filter((hotel) => hotel.category === activeCategory);

  return (
    <main className="bg-[#f5f3ed] text-[#18392f]">
      <section
        aria-labelledby="destinations-title"
        className="relative isolate flex min-h-[62svh] items-end overflow-hidden bg-[#283c32] text-white sm:min-h-[68svh]"
      >
        <img
          src="https://images.unsplash.com/photo-1542314831-c6a4d27de22f?auto=format&fit=crop&w=1800&q=85"
          alt="Luxury Hotel"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-black/80 via-black/40 to-black/20" />
        <div className="mx-auto w-full max-w-7xl px-5 pb-16 pt-36 sm:px-7 sm:pb-20 lg:px-10 lg:pb-24">
          <p className="mb-5 text-xs font-medium tracking-[0.18em] text-[#d4af37] uppercase">
            Global Collection
          </p>
          <h1
            id="destinations-title"
            className="m-0 max-w-4xl font-serif text-[clamp(2.75rem,10vw,4.5rem)] leading-[1.02] font-light tracking-tight"
          >
            Our Destinations
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            Discover our collection of iconic properties, each offering a unique blend of local heritage and unparalleled luxury.
          </p>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-7 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto w-full max-w-7xl">
          {/* Category Filter */}
          <div className="mb-12 flex flex-wrap gap-x-7 gap-y-3 border-b border-[#18392f]/15">
            {categories.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`min-h-11 border-b-2 px-1 pb-3 text-sm transition-colors cursor-pointer ${
                    isActive
                      ? "border-[#bc2525] font-medium text-[#18392f]"
                      : "border-transparent text-[#777d73] hover:text-[#18392f]"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Hotel Grid */}
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:gap-x-12 lg:gap-y-16">
            <AnimatePresence mode="popLayout" initial={false}>
              {filteredHotels.map((hotel, index) => (
                <motion.article
                  key={hotel.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group flex flex-col min-w-0"
                >
                  <Link to={`/destinations/${hotel.id}`} className="relative aspect-[4/3] overflow-hidden bg-neutral-200 block">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-transparent" />
                  </Link>
                  
                  <div className="mt-5 flex flex-col items-start justify-between gap-3 border-b border-[#18392f]/15 pb-4 min-[430px]:flex-row min-[430px]:gap-4">
                    <div>
                      <p className="text-[10px] font-medium tracking-[0.14em] text-[#bc2525] uppercase">
                        {hotel.location}
                      </p>
                      <h3 className="mt-1 font-serif text-2xl font-medium text-neutral-900 transition-colors group-hover:text-[#bc2525]">
                        <Link to={`/destinations/${hotel.id}`}>{hotel.name}</Link>
                      </h3>
                    </div>
                    <div className="shrink-0 min-[430px]:text-right">
                      <p className="text-[10px] uppercase tracking-wider text-neutral-500">From</p>
                      <p className="font-medium text-neutral-900">${hotel.startingRate}</p>
                    </div>
                  </div>
                  
                  <p className="mt-4 text-sm leading-relaxed text-[#56645b] line-clamp-2">
                    {hotel.overview}
                  </p>
                  
                  <Link 
                    to={`/destinations/${hotel.id}`}
                    className="mt-6 inline-flex min-h-11 w-fit items-center gap-2 border-b border-neutral-900 pb-1 text-xs font-bold tracking-[0.15em] text-neutral-900 uppercase transition-colors hover:border-[#bc2525] hover:text-[#bc2525]"
                  >
                    Discover More <ArrowDownRight size={14} />
                  </Link>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </main>
  );
}