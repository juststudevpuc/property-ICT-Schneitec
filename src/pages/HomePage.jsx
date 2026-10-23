import {
  ArrowRight,
  ClipboardCheck,
  Factory,
  LeafyGreen,
  MapPin,
  Quote,
  Sofa,
  Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SEO from "../components/shared/SEO";
import { fetchProjects } from "../lib/api";

const expertiseCard = [
  {
    logo: Factory,
    title: "Urban Planning",
    description:
      "Design master plans that foster community, connectivity, and long-term urban resilience.",
  },
  {
    logo: Sofa,
    title: "Interior Design",
    description:
      "Crafting immersive internal spaces that balance functional requirements with aesthetic elegance.",
  },
  {
    logo: LeafyGreen,
    title: "Sustainable Architecture",
    description:
      "Pioneering energy-efficient designs that minimize environmental footprint while maximizing comfort.",
  },
  {
    logo: ClipboardCheck,
    title: "Project Management ",
    description:
      "Overseeing technical execution with precision to ensure timelines and quality standards are met.",
  },
];

export default function HomePage() {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadFeatured() {
      try {
        const data = await fetchProjects();
        // Take the first 3 projects for the homepage grid
        setFeaturedProjects(data.slice(0, 3));
      } catch (error) {
        console.error("Failed to load featured projects:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadFeatured();
  }, []);

  return (
    <>
      <SEO
        title="Luxury Hotels & Real Estate"
        description="Welcome to Schneitec Property. Discover our collection of iconic properties, luxury real estate, and 5-star destinations in Cambodia."
      />
      <main className="overflow-hidden bg-[#f5f3ed] font-sans text-[#18392f]">
        <section
          className="relative isolate flex min-h-dvh w-full flex-col justify-center overflow-hidden bg-[#283c32] text-[#fffefa]"
          aria-labelledby="hero-title"
        >
          <video
            className="absolute inset-0 -z-10 h-full w-full object-cover object-[center_54%] max-sm:object-[58%_center]"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
            poster="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85"
          >
            <source src="/vdo-homepage.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(16,35,28,0.75)_0%,rgba(16,35,28,0.42)_45%,rgba(16,35,28,0.11)_100%),linear-gradient(0deg,rgba(15,32,25,0.35)_0%,transparent_43%)] max-sm:bg-[linear-gradient(90deg,rgba(16,35,28,0.72),rgba(16,35,28,0.32)),linear-gradient(0deg,rgba(15,32,25,0.45),transparent_65%)]" />

          <div
            className="w-full px-5 pt-28 pb-16 sm:px-7 sm:py-24 lg:px-[max(48px,calc((100%_-_1320px)/2))] lg:py-32"
            id="top"
          >
            <h1
              className="mt-[19px] mb-[17px] max-w-[740px] font-serif text-[clamp(48px,13vw,68px)] leading-[0.99] font-medium xl:text-[clamp(52px,6.5vw,92px)]"
              id="hero-title"
            >
              Our Architecture
              <br /> <em className="text-[#ffffff]">Vision</em>{" "}
            </h1>
            <p className="m-0 max-w-[790px] text-[18px] leading-[1.8] text-white/85 max-sm:max-w-[310px] xl:text-xl">
              Bright the gap between imagination and reality through sustainable,
              modular and innovation design framework that redefine urban living.
            </p>
            <a
              className="mt-[22px] inline-flex min-h-12 items-center gap-3 bg-[#de461c] px-4 py-2 text-base font-normal text-[#fffefa] transition hover:-translate-y-0.5 hover:bg-[#bd2904] sm:mt-[31px] sm:px-[18px] sm:text-xl"
              href="#featured-homes"
            >
              <span
                className="grid size-[31px] place-items-center rounded-full border border-white/60"
                aria-hidden="true"
              >
                <ArrowRight size={16} />
              </span>
              <span>Explore our legacy</span>
            </a>
          </div>
        </section>

        <section
          className="bg-[#f5f3ed] px-5 py-[59px] sm:px-7 sm:py-[76px] lg:px-[max(48px,calc((100%_-_1320px)/2))] lg:py-[97px]"
          id="featured-homes"
          aria-labelledby="featured-title"
        >
          <div className="mb-7 flex items-start justify-between gap-7 sm:mb-[39px] sm:items-end">
            <div>
              <h2
                className="mt-[15px] mb-0 font-serif text-[clamp(2rem,8vw,2.9375rem)] leading-[1.08] font-medium text-[#18392f]"
                id="featured-title"
              >
                <span className="inline-block border-b-[5px] border-[#bc2525] pb-1">
                  Feature
                </span>{" "}
                Projects
                <br />
              </h2>
            </div>
            <Link
              className="mt-0 inline-flex min-h-11 w-fit shrink-0 items-center gap-[5px] pb-[7px] text-xs font-medium text-red-600 transition-all hover:gap-4 sm:mt-0 sm:gap-[11px] sm:text-[19px]"
              to="/portfolio"
            >
              View all projects <ArrowRight size={16} />
            </Link>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-[#bc2525]" />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-[30px] md:grid-cols-3 md:gap-4 lg:gap-6">
              {featuredProjects.map((project, index) => (
                <article className="min-w-0" key={project.id}>
                  <Link
                    className="relative block aspect-[1.2] overflow-hidden bg-[#d9d9cf] sm:aspect-[1.25]"
                    to={`/projects/${project.id}`}
                    aria-label={`View ${project.title}`}
                  >
                    <img
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.04]"
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                    />
                    <span className="absolute right-[13px] bottom-3 font-serif text-[19px] text-white [text-shadow:0_1px_5px_rgba(0,0,0,0.35)]">
                      0{index + 1}
                    </span>
                  </Link>
                  <div className="pt-[17px]">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="mb-[7px] mt-0 font-serif text-[21px] font-medium text-[#18392f]">
                          <Link to={`/projects/${project.id}`} className="hover:text-[#bc2525]">
                            {project.title}
                          </Link>
                        </h3>
                        <p className="m-0 flex items-center gap-1 text-[10px] text-[#777d73]">
                          <MapPin size={13} className="text-[#db7457]" /> {project.category} Architecture
                        </p>
                      </div>
                    </div>
                    <p className="mb-0 mt-[15px] border-t border-[#dddcd4] pt-3 text-xs leading-relaxed text-[#56645b] line-clamp-2">
                      {project.overview}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Our expertise */}
        <section
          className="flex flex-col items-center bg-[#f3eedf] px-6 py-[61px] text-center sm:py-[74px]"
          id="our-way"
        >
          <p className="my-[17px] font-serif text-[clamp(34px,5vw,57px)] leading-[1.1] text-[#18392f]">
            Our Expertise
          </p>
          <p className="inline-flex items-center gap-2 py-2 text-[18px] font-sans text-[#56645b]">
            Excellence across every dimension of the build environment, from
            initial planning to final realization.
          </p>
          <div className="mt-10 grid w-full max-w-7xl grid-cols-1 gap-4 text-left sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {expertiseCard.map((expert) => {
              const ExpertiseIcon = expert.logo;
              return (
                <article
                  className="group flex min-h-64 flex-col border-t-2 border-[#18392f]/25 bg-[#fffefa]/65 p-6 transition-colors hover:border-[#bc2525] hover:bg-[#fffefa] sm:p-7"
                  key={expert.title}
                >
                  <div className="flex items-center justify-between">
                    <ExpertiseIcon
                      className="size-8 text-[#e01826] transition-transform group-hover:-translate-y-1"
                      strokeWidth={1.6}
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="mb-3 mt-10 font-serif text-xl font-medium leading-tight text-[#18392f] sm:text-2xl">
                    {expert.title.trim()}
                  </h3>
                  <p className="m-0 text-sm leading-6 text-[#56645b]">
                    {expert.description}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        {/* Who we are */}
        <section
          className="bg-[#f5f3ed] px-5 py-[59px] sm:px-7 sm:py-[76px] lg:px-[max(48px,calc((100%_-_1320px)/2))] lg:py-[97px]"
          aria-labelledby="who-we-are-title"
        >
          <div className="mb-7 grid grid-cols-1 items-start gap-5 sm:mb-[39px] sm:grid-cols-2 sm:items-end sm:gap-7">
            <div>
              <h2 className="mt-[15px] mb-0 font-serif text-[37px] leading-[1.08] font-medium text-[#18392f]">
                <span className="inline-block pb-1 text-xl text-red-600">
                  Who we are
                </span>
                <div className="font-medium text-[clamp(2rem,8vw,3.125rem)]">
                  <p>
                    Shaping the future <br /> through timeless design.{" "}
                  </p>
                </div>
                <div className="py-5 text-base leading-relaxed sm:text-lg text-[#56645b]">
                  <p>
                    Since our inception, Schneitec Property has been at the
                    forefront of global design innovation. We believe that
                    architecture is more than just buildings; it&apos;s about creating
                    legacy, fostering human connection, and respecting the
                    environment.
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-3 font-sans sm:gap-4 lg:gap-6">
                  <div>
                    <span className="text-2xl font-medium text-red-500 sm:text-3xl">
                      25+
                    </span>
                    <p className="text-sm text-[#56645b]">Years of Excellence</p>
                  </div>
                  <div>
                    <span className="text-2xl font-medium text-red-500 sm:text-3xl">
                      150+
                    </span>
                    <p className="text-sm text-[#56645b]">Global Projects</p>
                  </div>
                  <div>
                    <span className="text-2xl font-medium text-red-500 sm:text-3xl">12</span>
                    <p className="text-sm text-[#56645b]">Design Awards</p>
                  </div>
                </div>
              </h2>
            </div>
            <figure className="relative mt-8 min-h-[360px] overflow-hidden bg-[#d9d9cf] sm:mt-0 sm:min-h-[520px]">
              <img
                className="absolute inset-0 h-full w-full object-cover"
                src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&q=85"
                alt="Contemporary architecture with clean geometric lines"
                loading="lazy"
              />
            </figure>
          </div>
        </section>

        {/* Quote from CEO */}
        <section
          className="flex justify-center bg-[black] px-6 py-16 text-[#fffefa] sm:py-24"
          aria-label="A message from our CEO"
        >
          <figure className="m-0 flex w-full max-w-4xl flex-col items-center text-center">
            <Quote
              className="mb-5 size-10 text-[red] sm:size-12"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <blockquote className="m-0 max-w-3xl font-serif text-[clamp(25px,4vw,42px)] leading-[1.35]">
              “We believe thoughtful architecture can make everyday life better,
              bringing people closer to the places and communities they call
              home.”
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-4 text-left">
              <span
                className="grid size-14 place-items-center rounded-full border border-white/30 bg-white/10 font-serif text-sm text-[#f0a18a]"
                aria-hidden="true"
              >
                CEO
              </span>
              <span>
                <span className="block text-sm font-semibold">
                  Founder &amp; CEO
                </span>
                <span className="mt-1 block text-xs text-white/65">
                  Leadership
                </span>
              </span>
            </figcaption>
          </figure>
        </section>
      </main>
    </>
  );
}