import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { fetchOffers } from "../lib/api";

export default function OffersPage() {
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadOffers() {
      try {
        const data = await fetchOffers();
        setOffers(data);
      } catch (error) {
        console.error("Failed to load offers:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadOffers();
  }, []);

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
          
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-10 w-10 animate-spin text-[#bc2525]" />
            </div>
          ) : offers.length > 0 ? (
            <div className="mt-10 grid grid-cols-1 gap-7 sm:mt-12 md:grid-cols-2 md:gap-8 lg:mt-16 lg:grid-cols-3 lg:gap-12">
              {offers.map((offer) => (
                <article key={offer.id} className="group flex flex-col bg-white shadow-sm border border-neutral-100">
                  <div className="aspect-4/3 w-full overflow-hidden bg-neutral-200">
                    <img
                      src={offer.image_url}
                      alt={offer.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5 sm:p-8">
                    <p className="text-[10px] font-semibold tracking-[0.15em] text-neutral-400 uppercase">
                      {offer.validity_text || offer.validity}
                    </p>
                    <h3 className="mt-3 text-xl font-medium text-neutral-900">
                      {offer.title}
                    </h3>
                    <p className="mt-3 mb-8 text-sm leading-relaxed text-[#56645b]">
                      {offer.description}
                    </p>
                    <Link to={offer.cta_link || "/contact"} className="mt-auto inline-flex min-h-12 w-full items-center justify-center gap-2 border border-neutral-900 bg-transparent px-6 py-2.5 text-[10px] font-bold tracking-[0.15em] uppercase transition-colors hover:bg-neutral-900 hover:text-white sm:w-fit">
                      Book Offer
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="py-20 text-neutral-500">No special offers are available at this time.</p>
          )}
        </div>
      </section>
    </main>
  );
}