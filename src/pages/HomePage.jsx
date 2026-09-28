import {
  ArrowRight,
  Check,
  ClipboardCheck,
  Factory,
  LeafyGreen,
  MapPin,
  Quote,
  Sofa,
} from "lucide-react";

const homes = [
  {
    name: "The Willow House",
    location: "Silver Lake, Los Angeles",
    // price: "$1,285,000",
    details: "3 beds  ·  2 baths  ·  1,840 sq ft",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1100&q=85",
    // tag: "JUST LISTED",
  },
  {
    name: "Casa Solana",
    location: "Topanga, California",
    // price: "$1,740,000",
    details: "4 beds  ·  3 baths  ·  2,260 sq ft",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1100&q=85",
    // tag: "OPEN SUNDAY",
  },
  {
    name: "The Little Orchard",
    location: "Ojai, California",
    // price: "$925,000",
    details: "2 beds  ·  2 baths  ·  1,520 sq ft",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1100&q=85",
    // tag: "A LOCAL FAVORITE",
  },
];

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
  // function handleSearch(event) {
  //   event.preventDefault();
  //   document
  //     .getElementById("featured-homes")
  //     ?.scrollIntoView({ behavior: "smooth" });
  // }

  return (
    <main className="overflow-hidden bg-[#f5f3ed] font-sans text-[#18392f]">
      <section
        className="relative isolate flex min-h-screen flex-col bg-[#283c32] text-[#fffefa] lg:min-h-[min(840px,88svh)]"
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
          className="px-5 py-[59px] sm:px-7 sm:py-[76px] lg:px-[max(48px,calc((100%_-_1320px)/2))] lg:py-[97px]"
          id="top"
        >
          <h1
            className="mb-[17px] mt-[19px] max-w-[740px] font-serif text-[clamp(48px,13vw,68px)] leading-[0.99] font-medium xl:text-[clamp(52px,6.5vw,92px)]"
            id="hero-title"
          >
            Our Architecture
            <br /> <em className="text-[#ffffff]">Vision</em>{" "}
          </h1>
          <p className="m-0 max-w-[790px] text-[18px] leading-[1.8] text-white/85 xl:text-xl max-sm:max-w-[310px]">
            Bright the gap between imagination and reality through sustainable,
            modular and innovation design framework that redefine urban living.
          </p>
          <a
            className="mt-[22px] inline-flex items-center gap-3 bg-[#de461c] px-[18px] py-[10px] text-[20px] font-normal text-[#fffefa] transition hover:-translate-y-0.5 hover:bg-[#bd2904] sm:mt-[31px]"
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

        {/* <div className="absolute right-7 bottom-[174px] hidden items-center gap-[10px] text-[9px] text-white/75 sm:flex lg:right-12 lg:bottom-[157px]" aria-hidden="true">
          <span>34° 05&apos; N</span><span className="h-px w-6 bg-[#a5bc83]" /><span>Home is a feeling</span>
        </div> */}
      </section>

      <section
        className="bg-[#f5f3ed] px-5 py-[59px] sm:px-7 sm:py-[76px] lg:px-[max(48px,calc((100%_-_1320px)/2))] lg:py-[97px]"
        id="featured-homes"
        aria-labelledby="featured-title"
      >
        <div className="mb-7 flex items-start justify-between gap-7 sm:mb-[39px] sm:items-end">
          <div>
            {/* <p className="m-0 flex items-center gap-[10px] text-[10px] leading-[1.4] font-semibold text-[#777d73] uppercase"><span className="size-[7px] rounded-full bg-[#db7457]" /> A few places to begin</p> */}
            <h2
              className="mt-[15px] mb-0 font-serif text-[37px] leading-[1.08] font-medium text-[#18392f] sm:text-[47px]"
              id="featured-title"
            >
              <span className="inline-block border-b-[5px] border-[#bc2525] pb-1">
                Feature
              </span>{" "}
              Projects
              <br />
            </h2>
          </div>
          <a
            className="mt-[27px] inline-flex shrink-0 items-center gap-[5px] pb-[7px] text-[9px] text-red-600 font-semibold transition-all hover:gap-4 sm:mt-0 sm:gap-[11px] sm:text-[19px]"
            href="#"
          >
            View all project <ArrowRight size={16} />
          </a>
        </div>

        <div className="grid grid-cols-1 gap-[30px] sm:grid-cols-3 sm:gap-4 lg:gap-6">
          {homes.map((home, index) => (
            <article className="min-w-0" key={home.name}>
              <a
                className="relative block aspect-[1.2] overflow-hidden bg-[#d9d9cf] sm:aspect-[1.25]"
                href={`mailto:hello@hearthandhome.com?subject=${encodeURIComponent(`Tell me about ${home.name}`)}`}
                aria-label={`Ask about ${home.name}`}
              >
                <img
                  className="h-full w-full object-cover transition-transform duration-500  :scale-[1.04]"
                  src={home.image}
                  alt={`${home.name}, a home in ${home.location}`}
                  loading="lazy"
                />
                <span className="absolute right-[13px] bottom-3 font-serif text-[19px] te xt-white [text-shadow:0_1px_5px_rgba(0,0,0,0.35)]">
                  0{index + 1}
                </span>
              </a>
              <div className="pt-[17px]">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="mb-[7px] mt-0 font-serif text-[21px] font-medium text-[#18392f]">
                      {home.name}
                    </h3>
                    <p className="m-0 flex items-center gap-1 text-[10px] text-[#777d73]">
                      <MapPin size={13} className="text-[#db7457]" />{" "}
                      {home.location}
                    </p>
                  </div>
                  <span className="shrink-0 pt-[3px] text-xs font-bold text-[#18392f]">
                    {home.price}
                  </span>
                </div>
                <p className="mb-0 mt-[15px] border-t border-[#dddcd4] pt-3 text-[10px] text-[#85877f]">
                  {home.details}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
      {/* Our expertise  */}
      <section
        className="flex flex-col items-center bg-[#f3eedf] px-6 py-[61px] text-center sm:py-[74px]"
        id="our-way"
      >
        <p className="my-[17px] font-serif text-[clamp(34px,5vw,57px)] leading-[1.1] text-[#18392f]">
          Our Expertise
        </p>
        <a
          className="inline-flex items-center gap-2 py-2 text-[18px] font-sans"
          // href="mailto:hello@hearthandhome.com"
        >
          Excellence across every dimension of the build environment, from
          initial planning of final realization.
        </a>
        <div className="mt-10 grid w-full max-w-7xl grid-cols-1 gap-4 text-left sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {expertiseCard.map((expert) => {
            const ExpertiseIcon = expert.logo;

            return (
              <article
                className="group flex min-h-64 flex-col border-t-2 border-[#18392f]/25 bg-[#fffefa]/65 p-6 transition-colors hover:border-[#bc2525] hover:bg-[#fffefa] sm:p-7"
                key={expert.title}
              >
                <div className="flex items-center justify-between">
                  {/* <span className="font-serif text-sm text-[#bc2525]">
                    {index}
                  </span> */}
                  <ExpertiseIcon
                    className="size-8 text-[#e01826] transition-transform group-hover:-translate-y- 1"
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
      {/* Who we are  */}
      <section
        className="bg-[#f5f3ed] px-5 py-[59px] sm:px-7 sm:py-[76px] lg:px-[max(48px,calc((100%_-_1320px)/2))] lg:py-[97px]"
        id="featured-homes"
        aria-labelledby="featured-title"
      >
        <div className="mb-7 flex items-start justify-between gap-7 sm:mb-[39px] sm:items-end grid grid-cols-2 sm:grid-cols-2">
          <div >
            {/* <p className="m-0 flex items-center gap-[10px] text-[10px] leading-[1.4] font-semibold text-[#777d73] uppercase"><span className="size-[7px] rounded-full bg-[#db7457]" /> A few places to begin</p> */}
            <h2
              className="mt-[15px] mb-0 font-serif text-[37px] leading-[1.08] font-medium text-[#18392f]"
              id="featured-title"
            >
              <span className="inline-block text-xl text-red-600 pb-1">
                Who we are
              </span>
              <div className="font-semibold text-[50px] ">
                <p>
                  Shaping the future <br /> through timeless design.{" "}
                </p>
              </div>
              <div className="py-5 text-[18px]">
                <p>
                  Since our inception, LEGO Architecture has been at the
                  forefront of global design innovation. We believe that
                  architecture is more than just buildings; it's about creating
                  legacy, fostering human connection, and respecting the
                  environment
                </p>
              </div>
              <div className="grid grid-cols-3 gap-[30px] font-sans sm:grid-cols-3 sm:gap-4 lg:gap-6">
                <div className="">
                  <span className="text-3xl font-bold text-red-500 ">25+</span>
                  <p className="text-sm">Years of Excellent </p>
                </div>
                <div className="">
                  <span className="text-3xl font-bold text-red-500 ">150+</span>
                  <p className="text-sm">Global Projects </p>
                </div>
                <div className="">
                  <span className="text-3xl font-bold text-red-500 ">12</span>
                  <p className="text-sm">Design Awards </p>
                </div>
              </div>
            </h2>
          </div>
          <figure className="relative mt-8 min-h-[360px] overflow-hidden bg-[#d9d9cf] sm:mt-0 sm:min-h-[520px]">
            <img
              className="absolute inset-0 h-full w-full object-cover"
              src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&q=85"
              alt="Contemporary architecture with clean geometric lines and a sculptural facade"
              loading="lazy"
            />
            {/* <figcaption className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-[#18392f]/75 to-transparent px-6 pt-20 pb-5 text-sm text-white">
              Architecture shaped around the way we live.
            </figcaption> */}
          </figure>
        </div>
      </section>
      
        {/* Quote from CEO */}
        <section className="flex justify-center bg-[black] px-6 py-16 text-[#fffefa] sm:py-24" aria-label="A message from our CEO">
          <figure className="m-0 flex w-full max-w-4xl flex-col items-center text-center">
            <Quote className="mb-5 size-10 text-[red] sm:size-12" strokeWidth={1.5} aria-hidden="true" />
            <blockquote className="m-0 max-w-3xl font-serif text-[clamp(25px,4vw,42px)] leading-[1.35]">
              “We believe thoughtful architecture can make everyday life better, bringing people closer to the places and communities they call home.”
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-4 text-left">
              <span className="grid size-14 place-items-center rounded-full border border-white/30 bg-white/10 font-serif text-sm text-[#f0a18a]" aria-hidden="true">
                CEO
              </span>
              <span>
                <span className="block text-sm font-semibold">Founder &amp; CEO</span>
                <span className="mt-1 block text-xs text-white/65">Leadership</span>
              </span>
            </figcaption>
          </figure>
        </section>

        {/* footer  */}
    </main>
  );
}
