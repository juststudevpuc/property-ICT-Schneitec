// import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const OFFERS = [
  {
    id: 1,
    title: "Stay 3, Pay 2",
    validity: "Valid until Dec 31, 2026",
    description: "Enjoy an extended getaway with a complimentary third night when you book our luxury suites.",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Spa Retreat Package",
    validity: "Valid Year Round",
    description: "Includes daily breakfast, a 60-minute signature massage for two, and late checkout.",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Early Bird Advance",
    validity: "Book 14 days in advance",
    description: "Plan ahead and save up to 20% on our best available rates for your upcoming stay.",
    image: "https://images.unsplash.com/photo-1551882547-ff40c0d12c56?auto=format&fit=crop&w=800&q=80",
  }
];

export default function OffersPage() {
  return (
    <main className="bg-[#f5f3ed] text-[#18392f]">
      <section className="px-5 pb-16 pt-36 sm:px-7 sm:pb-20 lg:px-10 lg:pt-48">
        <div className="mx-auto w-full max-w-7xl">
          <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-[#bc2525] uppercase">
            Exclusive Promotions
          </p>
          <h1 className="m-0 max-w-3xl text-4xl leading-tight font-light tracking-tight sm:text-5xl lg:text-6xl">
            Special Offers & Packages
          </h1>
          
          <div className="mt-10 grid grid-cols-1 gap-7 sm:mt-12 md:grid-cols-2 md:gap-8 lg:mt-16 lg:grid-cols-3 lg:gap-12">
            {OFFERS.map((offer) => (
              <article key={offer.id} className="group flex flex-col bg-white shadow-sm border border-neutral-100">
                <div className="aspect-4/3 w-full overflow-hidden bg-neutral-200">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-8">
                  <p className="text-[10px] font-semibold tracking-[0.15em] text-neutral-400 uppercase">
                    {offer.validity}
                  </p>
                  <h3 className="mt-3 text-xl font-medium text-neutral-900">
                    {offer.title}
                  </h3>
                  <p className="mt-3 mb-8 text-sm leading-relaxed text-[#56645b]">
                    {offer.description}
                  </p>
                  <Link to="/contact" className="mt-auto inline-flex min-h-12 w-full items-center justify-center gap-2 border border-neutral-900 bg-transparent px-6 py-2.5 text-[10px] font-bold tracking-[0.15em] uppercase transition-colors hover:bg-neutral-900 hover:text-white sm:w-fit">
                    Book Offer
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}