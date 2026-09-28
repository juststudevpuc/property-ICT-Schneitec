import {
  Award,
  BadgeCheck,
  Leaf,
  Lightbulb,
  Medal,
  Ruler,
  Star,
  Trophy,
} from "lucide-react";

export default function AboutPage() {
  const philosophy = [
    {
      logo: Leaf,
      title: "Sustainability",
      description:
        "Integrating eco-friendly materials and renewable energy solutions into every blueprint.",
    },
    {
      logo: Lightbulb,
      title: "Innovation",
      description:
        "Pushing the boundaries of structural engineering with cutting-edge technologies.",
    },
    {
      logo: Ruler,
      title: "Precision",
      description:
        "Meticulous attention to detail, ensuring every millimeter serves a greater purpose.",
    },
  ];

  const LEAD_ARCHITECTS = [
    {
      id: 1,
      name: "Erik Sørensen",
      role: "Principal Architect & Founder",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      name: "Anya Petrova",
      role: "Director of Design",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      name: "Marcus Chen",
      role: "Head of Urban Planning",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 4,
      name: "Sofia Rossi",
      role: "Sustainable Systems Expert",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const AWARDS = [
    { id: 1, title: "PRITZKER PRIZE 2022", icon: Trophy },
    { id: 2, title: "AIA GOLD MEDAL", icon: Medal },
    { id: 3, title: "RIBA ROYAL MEDAL", icon: Award },
    { id: 4, title: "LEED PLATINUM CERTIFIED", icon: BadgeCheck },
    { id: 5, title: "ARCHITIZER A+ AWARD", icon: Star },
  ];
  return (
    <main className="bg-[#f5f3ed] text-[#18392f] ">
      <section
        aria-labelledby="about-title"
        className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-[#283c32] text-white"
      >
        <img
          src="/img/aboutUsbanner.png"
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-black/70 via-black/35 to-black/10" />
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center px-5 py-32 text-center sm:px-7 lg:px-10">
          <h1
            className="m-0 text-5xl font-medium leading-tight sm:text-6xl lg:text-7xl"
            id="about-title"
          >
            About Us
          </h1>
          <span aria-hidden="true" className="mt-5 h-1 w-20  bg-white" />
          {/* <p className="mt-5 max-w-2xl text-base leading-7 text-white/85 sm:text-lg sm:leading-8">
            Innovative architectural solutions for a better tomorrow. Building
            legacies through design excellence since 1932.
          </p> */}
        </div>
      </section>
      {/* Body  */}
      <section className="">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-10 md:grid-cols-2 lg:gap-16">
          <div className="max-w-xl">
            <p className="mb-4 text-xs font-semibold tracking-[0.18em] text-[#bc2525] uppercase">
              Our Legacy
            </p>
            <h2 className="m-0 max-w-md font-serif text-3xl leading-tight font-medium sm:text-4xl">
              Crafting Skylines Since 1994
            </h2>
            <p className="mt-6 text-base leading-7 text-[#56645b]">
              LEGO Architecture was founded on the principle that spaces should
              inspire. What began as a small studio in Copenhagen has evolved
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
            className="aspect-3/3 w-full object-cover object-center"
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
            <span
              aria-hidden="true"
              className="mx-auto mt-4 block h-1 w-16 bg-[#bc2525]"
            />
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 lg:grid-cols-3">
            {philosophy.map((principle) => {
              const PhilosophyIcon = principle.logo;

              return (
                <article
                  className="min-h-56 border-t-2     border-[#bc2525]/70 bg-white p-6 sm:p-7"
                  key={principle.title}
                >
                  <PhilosophyIcon
                    className="size-7 text-[#bc2525]"
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />
                  <h3 className="mb-3 mt-6 font-serif text-2xl font-medium text-[#18392f]">
                    {principle.title}
                  </h3>
                  <p className="m-0 text-sm leading-6 text-[#56645b]">
                    {principle.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      {/* Lead Architects Section */}
      <section className="bg-[#f5f3ed] px-5 py-16 sm:px-7 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto w-full max-w-7xl">
          {/* Section Header */}
          <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-3 text-xs font-semibold tracking-[0.18em] text-[#bc2525] uppercase">
                THE VISIONARIES
              </p>
              <h2 className="m-0 max-w-md font-manrope text-3xl leading-tight font-medium tracking-tight text-neutral-900 sm:text-4xl">
                Lead Architects
              </h2>
            </div>

            <a
              href="#team"
              className="w-fit border-b-2 border-neutral-900 pb-1 text-xs font-medium tracking-[0.12em] text-neutral-900 uppercase transition-colors hover:border-[#bc2525] hover:text-[#bc2525]"
            >
              MEET THE FULL TEAM
            </a>
          </div>

          {/* Architects Grid */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {LEAD_ARCHITECTS.map((architect) => (
              <div key={architect.id} className="group flex flex-col">
                <div className="mb-4 aspect-3/4 w-full overflow-hidden bg-neutral-200">
                  <img
                    src={architect.image}
                    alt={architect.name}
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-base font-medium text-neutral-900">
                  {architect.name}
                </h3>
                <p className="mt-0.5 text-xs text-neutral-500">
                  {architect.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Awards Bar */}
      <section className="border-t border-neutral-200/80 bg-white px-5 py-12 sm:px-7 lg:px-10">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          {AWARDS.map((award) => {
            const IconComponent = award.icon;
            return (
              <div
                key={award.id}
                className="flex flex-col items-center justify-center gap-3 text-center"
              >
                <IconComponent
                  className="h-6 w-6 text-neutral-500"
                  strokeWidth={1.75}
                />
                <span className="text-[10px] font-medium tracking-[0.14em] text-neutral-500 uppercase">
                  {award.title}
                </span>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
