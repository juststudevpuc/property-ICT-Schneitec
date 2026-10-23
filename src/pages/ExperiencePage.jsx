import { ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchExperiences } from "../lib/api";

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadExperiences() {
      try {
        const data = await fetchExperiences();
        setExperiences(data);
      } catch (error) {
        console.error("Failed to load experiences:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadExperiences();
  }, []);

  return (
    <main className="bg-[#f5f3ed] text-[#18392f]">
      <section className="relative isolate flex min-h-[70vh] items-center justify-center overflow-hidden bg-[#283c32] text-white">
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1800&q=80"
          alt="Luxury hotel experience"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(0,0,0,0.8),rgba(0,0,0,0.4),rgba(0,0,0,0.2))]" />
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
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-10 w-10 animate-spin text-[#bc2525]" />
            </div>
          ) : experiences.length > 0 ? (
            experiences.map((exp, index) => (
              <article 
                key={exp.id} 
                className={`grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-20 ${
                  index % 2 !== 0 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={`aspect-[4/3] w-full overflow-hidden bg-neutral-200 ${index % 2 !== 0 ? "lg:order-2" : ""}`}>
                  <img
                    src={exp.image_url}
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
                  <Link to={exp.cta_link || "/contact"} className="mt-8 inline-flex items-center gap-2 border-b border-neutral-900 pb-1 text-xs font-bold tracking-[0.15em] uppercase transition-colors hover:border-[#bc2525] hover:text-[#bc2525]">
                    Enquire Now <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            ))
          ) : (
            <p className="text-center text-neutral-500">No experiences available at this time.</p>
          )}
        </div>
      </section>
    </main>
  );
}