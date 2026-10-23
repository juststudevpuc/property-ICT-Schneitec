import { useState, useEffect } from "react";
import {
  Award, BadgeCheck, Leaf, Lightbulb, Medal, Ruler, Star, Trophy, Loader2
} from "lucide-react";
import { fetchTeam, fetchAwards } from "../lib/api";

// Map CMS string names to actual Lucide components
const IconMap = {
  "Trophy": Trophy,
  "Medal": Medal,
  "Award": Award,
  "BadgeCheck": BadgeCheck,
  "Star": Star
};

export default function AboutPage() {
  const [team, setTeam] = useState([]);
  const [awards, setAwards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    async function loadData() {
      try {
        const [teamData, awardsData] = await Promise.all([
          fetchTeam(),
          fetchAwards()
        ]);
        if (!ignore) {
          setTeam(teamData);
          setAwards(awardsData);
        }
      } catch (error) {
        console.error("Failed to load about page data:", error);
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }
    loadData();
    return () => { ignore = true; };
  }, []);

  const philosophy = [
    {
      logo: Leaf,
      title: "Sustainability",
      description: "Integrating eco-friendly materials and renewable energy solutions into every blueprint.",
    },
    {
      logo: Lightbulb,
      title: "Innovation",
      description: "Pushing the boundaries of structural engineering with cutting-edge technologies.",
    },
    {
      logo: Ruler,
      title: "Precision",
      description: "Meticulous attention to detail, ensuring every millimeter serves a greater purpose.",
    },
  ];

  return (
    <main className="bg-[#f5f3ed] text-[#18392f] ">
      <section
        aria-labelledby="about-title"
        className="relative isolate flex min-h-dvh items-center justify-center overflow-hidden bg-[#283c32] text-white"
      >
        <img
          src="/img/aboutUsbanner.png"
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(0,0,0,0.7),rgba(0,0,0,0.35),rgba(0,0,0,0.1))]" />
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center px-5 py-32 text-center sm:px-7 lg:px-10">
          <h1 className="m-0 text-[clamp(2.5rem,10vw,4.5rem)] font-medium leading-tight" id="about-title">
            About Us
          </h1>
          <span aria-hidden="true" className="mt-5 h-1 w-20 bg-white" />
        </div>
      </section>

      {/* Body  */}
      <section className="px-5 py-16 sm:px-7 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-10 md:grid-cols-2 lg:gap-16">
          <div className="max-w-xl">
            <p className="mb-4 text-xs font-semibold tracking-[0.18em] text-[#bc2525] uppercase">
              Our Legacy
            </p>
            <h2 className="m-0 max-w-md font-serif text-3xl leading-tight font-medium sm:text-4xl">
              Crafting Skylines Since 1994
            </h2>
            <p className="mt-6 text-base leading-7 text-[#56645b]">
              Schneitec Property was founded on the principle that spaces should
              inspire. What began as a small studio has evolved
              into a global architectural force, redefining modern living
              through structural innovation and aesthetic precision.
            </p>
            <p className="mt-4 text-base leading-7 text-[#56645b]">
              Our vision remains unchanged: to create sustainable, functional,
              and breathtaking environments that stand the test of time. We
              don't just build structures; we build the backdrop for human
              experience.
            </p>
          </div>
          <img
            className="aspect-square w-full object-cover object-center"
            src="/img/aboutUs2.png"
            alt="Modern architectural building"
            loading="lazy"
          />
        </div>
      </section>

      <section className="bg-[#ebe9e1] px-5 py-16 sm:px-7 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center sm:mb-12">
            <h2 className="m-0 font-serif text-3xl font-medium text-[#18392f] sm:text-4xl">
              Our Philosophy
            </h2>
            <span aria-hidden="true" className="mx-auto mt-4 block h-1 w-16 bg-[#bc2525]" />
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 lg:grid-cols-3">
            {philosophy.map((principle) => {
              const PhilosophyIcon = principle.logo;
              return (
                <article className="min-h-56 border-t-2 border-[#bc2525]/70 bg-white p-6 sm:p-7" key={principle.title}>
                  <PhilosophyIcon className="size-7 text-[#bc2525]" strokeWidth={1.7} aria-hidden="true" />
                  <h3 className="mb-3 mt-6 font-serif text-2xl font-medium text-[#18392f]">
                    {principle.title}
                  </h3>
                  <p className="m-0 text-sm leading-6 text-[#56645b]">{principle.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lead Architects Section */}
      <section className="bg-[#f5f3ed] px-5 py-16 sm:px-7 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto w-full max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-3 text-xs font-semibold tracking-[0.18em] text-[#bc2525] uppercase">
                THE VISIONARIES
              </p>
              <h2 className="m-0 max-w-md font-manrope text-3xl leading-tight font-medium tracking-tight text-neutral-900 sm:text-4xl">
                Lead Architects
              </h2>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-[#bc2525]" /></div>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((architect) => (
                <div key={architect.id} className="group flex flex-col">
                  <div className="mb-4 aspect-[3/4] w-full overflow-hidden bg-neutral-200">
                    <img
                      src={architect.image_url}
                      alt={architect.name}
                      loading="lazy"
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-base font-medium text-neutral-900">{architect.name}</h3>
                  <p className="mt-0.5 text-xs text-neutral-500">{architect.role}</p>
                </div>
              ))}
              {team.length === 0 && <p className="text-neutral-500">No team members found.</p>}
            </div>
          )}
        </div>
      </section>

      {/* Bottom Awards Bar */}
      <section className="border-t border-neutral-200/80 bg-white px-5 py-12 sm:px-7 lg:px-10">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          {!isLoading && awards.map((award) => {
            const IconComponent = IconMap[award.icon_name] || Trophy; // Fallback to Trophy
            return (
              <div key={award.id} className="flex flex-col items-center justify-center gap-3 text-center">
                <IconComponent className="h-6 w-6 text-neutral-500" strokeWidth={1.75} />
                <span className="text-[10px] font-medium tracking-[0.14em] text-neutral-500 uppercase">
                  {award.title} {award.year ? ` ${award.year}` : ''}
                </span>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}