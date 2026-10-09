import { ArrowLeft, Calendar, Users } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { hotels } from "../lib/hotels";

export default function ProjectDetailPage() {
  const { hotelId } = useParams();
  const hotel = hotels.find((item) => item.id === Number(hotelId));

  if (!hotel) {
    return (
      <main className="flex min-h-[70svh] items-center justify-center bg-[#f5f3ed]">
        <h1 className="text-2xl font-medium">Hotel not found.</h1>
      </main>
    );
  }

  return (
    <main className="bg-[#f5f3ed] text-[#18392f]">
      {/* Hero Banner */}
      <section       className="relative isolate flex min-h-[68svh] items-end overflow-hidden bg-[#283c32] text-white sm:min-h-[75svh]">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
        <div className="mx-auto w-full max-w-7xl px-5 pb-16 pt-40 sm:px-7 sm:pb-20 lg:px-10">
          <Link
            to="/destinations"
            className="mb-8 inline-flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-white"
          >
            <ArrowLeft size={16} /> All Destinations
          </Link>
          <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-[#d4af37] uppercase">
            {hotel.location}
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="m-0 max-w-4xl font-serif text-[clamp(2.25rem,8vw,3.75rem)] leading-tight font-light tracking-tight"
          >
            {hotel.name}
          </motion.h1>
        </div>
      </section>

      {/* Main Content & Sticky Booking Widget */}
      <section className="px-5 py-16 sm:px-7 lg:px-10 lg:py-24">
        <div className="mx-auto w-full max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            
            {/* Left Column: Hotel Info */}
            <div className="flex-1 w-full">
              <h2 className="text-2xl font-medium text-neutral-900">Experience the Extraordinary</h2>
              <p className="mt-6 text-base leading-8 text-[#56645b]">
                {hotel.description}
              </p>

              <div className="mt-12">
                <h3 className="text-lg font-medium text-neutral-900 border-b border-neutral-200 pb-4 mb-6">Signature Amenities</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {hotel.amenities.map((amenity, index) => (
                    <li key={index} className="flex items-center gap-3 text-sm text-[#56645b]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#bc2525]" />
                      {amenity}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Gallery */}
              <div className="mt-16">
                <h3 className="text-lg font-medium text-neutral-900 border-b border-neutral-200 pb-4 mb-6">Gallery</h3>
                <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 sm:grid sm:snap-none sm:grid-cols-2 sm:overflow-visible">
                  {hotel.gallery.map((img, index) => (
                    <figure
                      key={img.label}
                      className={`w-[85vw] shrink-0 snap-center overflow-hidden bg-neutral-200 sm:w-auto ${
                        index === 0
                          ? "aspect-video sm:col-span-2"
                          : "aspect-square"
                      }`}
                    >
                      <img
                        src={img.src}
                        alt={img.label}
                        className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                    </figure>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Sticky Booking Widget */}
            <aside className="w-full lg:w-[400px] shrink-0 lg:sticky lg:top-32">
              <div className="border border-neutral-100 bg-white p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-8">
                <div className="flex items-end justify-between border-b border-neutral-100 pb-6 mb-6">
                  <div>
                    <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold">Starting from</p>
                    <p className="text-3xl font-serif mt-1 text-neutral-900">${hotel.startingRate}<span className="text-sm text-neutral-500 font-sans"> / night</span></p>
                  </div>
                </div>

                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                  {/* Dates */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label htmlFor="check-in" className="text-[10px] font-bold text-neutral-600 uppercase tracking-wider">Check-in</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                        <input id="check-in" type="date" className="h-12 w-full border border-neutral-200 bg-neutral-50 pl-10 pr-3 text-base focus:border-neutral-900 focus:outline-none" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="check-out" className="text-[10px] font-bold text-neutral-600 uppercase tracking-wider">Check-out</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                        <input id="check-out" type="date" className="h-12 w-full border border-neutral-200 bg-neutral-50 pl-10 pr-3 text-base focus:border-neutral-900 focus:outline-none" />
                      </div>
                    </div>
                  </div>

                  {/* Guests */}
                  <div className="space-y-1.5">
                    <label htmlFor="guests" className="text-[10px] font-bold text-neutral-600 uppercase tracking-wider">Guests</label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                      <select id="guests" className="h-12 w-full appearance-none border border-neutral-200 bg-neutral-50 pl-10 pr-3 text-base focus:border-neutral-900 focus:outline-none">
                        <option>1 Adult</option>
                        <option>2 Adults</option>
                        <option>2 Adults, 1 Child</option>
                        <option>2 Adults, 2 Children</option>
                      </select>
                    </div>
                  </div>

                  <button className="mt-4 min-h-14 w-full cursor-pointer bg-neutral-900 py-4 text-xs font-bold tracking-[0.15em] text-white uppercase transition-colors hover:bg-[#bc2525]">
                    Check Availability
                  </button>
                </form>
              </div>
            </aside>

          </div>
        </div>
      </section>
    </main>
  );
}