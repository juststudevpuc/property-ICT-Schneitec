import { ArrowDown, ArrowRight } from "lucide-react";

export default function MediaPage() {
  const NEWS_ARTICLES = [
    {
      id: 1,
      date: "OCTOBER 14, 2023",
      title: "LEGO Announces Completion of the Nordic Glass Pavilion",
      excerpt:
        "Our latest project in Copenhagen redefines the boundaries between indoor living and the natural world...",
      image:
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80",
      link: "#news-1",
    },
    {
      id: 2,
      date: "SEPTEMBER 28, 2023",
      title: "Exploring Verticality: The New Urban Housing Initiative",
      excerpt:
        "How we are tackling the challenges of density through modular design and sustainable vertical gardens...",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
      link: "#news-2",
    },
    {
      id: 3,
      date: "AUGUST 12, 2023",
      title: "LEGO Wins Global Design Award for Sustainable Public Spaces",
      excerpt:
        "Recognized for our innovative approach to repurposing industrial zones into vibrant community hubs...",
      image:
        "https://images.unsplash.com/photo-1629050290461-283e7bd7805f?q=80&w=918&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      link: "#news-3",
    },
  ];

  const FEATURED_PUBLICATIONS = [
    {
      id: 1,
      name: "ArchDaily",
      className: "font-sans text-lg font-medium italic tracking-tight",
    },
    {
      id: 2,
      name: "DEZEEN",
      className: "font-serif text-sm font-semibold tracking-[0.12em] uppercase",
    },
    {
      id: 3,
      name: "ARCHITECTURAL DIGEST",
      className: "font-sans text-base font-medium tracking-tight uppercase",
    },
    {
      id: 4,
      name: "Wallpaper*",
      className: "font-serif text-lg font-normal tracking-wide",
    },
    {
      id: 5,
      name: "Dwell",
      className: "font-sans text-lg font-medium italic",
    },
  ];

  const RECENT_AWARDS = [
    {
      id: 1,
      year: "2023",
      title: "AIA Honor Award for Architecture",
      subtitle: "The Obsidian Tower, New York",
    },
    {
      id: 2,
      year: "2023",
      title: "Pritzker Architecture Prize Nomination",
      subtitle: "Studio Recognition",
    },
    {
      id: 3,
      year: "2022",
      title: "RIBA International Excellence Award",
      subtitle: "Desert Mirage Museum, Dubai",
    },
  ];
  return (
    <div className="">
      {/* header */}
      <section
        aria-labelledby="about-title"
        className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-[#283c32] text-white"
      >
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-black/70 via-black/35 to-black/10" />
        <div className="mx-auto flex w-full max-w-7xl max-h-5 flex-col px-5 py-39 sm:px-7 lg:px-10">
          <h1
            className="m-0 text-5xl font-medium leading-tight sm:text-6xl lg:text-7xl"
            id="about-title"
          >
            Shipping Tomorrow's <br /> Architectural Landscape.
          </h1>
          <span aria-hidden="true" className="font-normal">
            A glimpse into the latest developments, insights, and media <br />
            milestones from LEGO Architectural Studio.
          </span>
        </div>
      </section>
      {/*  */}
      {/* Top Section: Latest News & Press */}
      <section className="bg-white px-5 py-16 sm:px-7 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto w-full max-w-7xl">
          {/* Section Header */}
          <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-3 text-[10px] font-semibold tracking-[0.22em] text-neutral-400 uppercase">
                INSIGHTS
              </p>
              <h2 className="m-0 text-3xl leading-tight font-medium tracking-tight text-neutral-900 sm:text-4xl">
                Latest News &amp; Press
              </h2>
            </div>

            <a
              href="#all-news"
              className="w-fit border-b border-neutral-900 pb-1 text-[11px] font-medium tracking-[0.12em] text-neutral-900 uppercase transition-colors hover:border-[#bc2525] hover:text-[#bc2525]"
            >
              VIEW ALL NEWS
            </a>
          </div>

          {/* 3-Column News Articles Grid */}
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-3">
            {NEWS_ARTICLES.map((article) => (
              <article key={article.id} className="group flex flex-col">
                <a
                  href={article.link}
                  className="mb-5 block aspect-square w-full overflow-hidden bg-neutral-100"
                >
                  <img
                    src={article.image}
                    alt={article.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </a>

                <time className="text-[10px] font-medium tracking-[0.12em] text-neutral-400 uppercase">
                  {article.date}
                </time>

                <h3 className="mt-2 text-lg leading-snug font-normal text-neutral-900 transition-colors group-hover:text-[#bc2525]">
                  <a href={article.link}>{article.title}</a>
                </h3>

                <p className="mt-2.5 line-clamp-2 text-xs leading-relaxed text-neutral-500">
                  {article.excerpt}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Section: Featured In Press Bar */}
      <section className="border-t border-neutral-100 bg-[#fafafa] px-5 py-14 sm:px-7 lg:px-10">
        <div className="mx-auto w-full max-w-7xl text-center">
          <p className="mb-8 text-[10px] font-semibold tracking-[0.24em] text-neutral-400 uppercase">
            FEATURED IN
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 sm:justify-between">
            {FEATURED_PUBLICATIONS.map((brand) => (
              <span
                key={brand.id}
                className={`${brand.className} text-neutral-400 transition-colors duration-200 hover:text-neutral-700`}
              >
                {brand.name}
              </span>
            ))}
          </div>
        </div>
      </section>
      {/* Recent Awards & Media Kit */}
      <section className="bg-white px-5 py-16 sm:px-7 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column: Recognition / Recent Awards */}
          <div>
            <p className="mb-2 text-[10px] font-semibold tracking-[0.22em] text-neutral-400 uppercase">
              RECOGNITION
            </p>
            <h2 className="mb-10 text-3xl font-medium tracking-tight text-neutral-900 sm:text-4xl">
              Recent Awards
            </h2>

            <div className="divide-y divide-neutral-100">
              {RECENT_AWARDS.map((award) => (
                <div
                  key={award.id}
                  className="flex items-baseline gap-8 py-6 first:pt-0"
                >
                  <span className="w-12 shrink-0 text-xs font-medium text-neutral-400">
                    {award.year}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-neutral-900">
                      {award.title}
                    </h3>
                    <p className="mt-1 text-xs text-neutral-500">
                      {award.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Media Kit Box */}
          <div className="bg-[#f7f8f9] p-8 sm:p-12">
            <h3 className="text-lg font-normal text-neutral-900">Media Kit</h3>
            <p className="mt-4 text-xs leading-relaxed text-neutral-500 sm:text-sm">
              Access our comprehensive press resources, including
              high-resolution project photography, partner biographies, and our
              visual identity guidelines.
            </p>

            <div className="mt-8 space-y-3.5">
              <a
                href="#download-brand-assets"
                className="flex w-full items-center justify-between border border-neutral-400 bg-transparent px-5 py-3.5 text-[10px] font-medium tracking-[0.14em] text-neutral-900 uppercase transition-colors hover:border-neutral-900 hover:bg-neutral-900 hover:text-white"
              >
                <span>BRAND ASSETS PACK (42MB)</span>
                <ArrowDown className="h-3.5 w-3.5" />
              </a>

              <a
                href="#press-archive"
                className="flex w-full items-center justify-between border border-neutral-400 bg-transparent px-5 py-3.5 text-[10px] font-medium tracking-[0.14em] text-neutral-900 uppercase transition-colors hover:border-neutral-900 hover:bg-neutral-900 hover:text-white"
              >
                <span>PRESS RELEASE ARCHIVE</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Black Background: Press Inquiries */}
      <section className="bg-black px-5 py-20 text-white sm:px-7 sm:py-28 lg:px-10">
        <div className="mx-auto max-w-xl text-center">
          <span className="block text-[10px] font-medium tracking-[0.24em] text-neutral-400 uppercase">
            PRESS INQUIRIES
          </span>

          <h2 className="mt-4 text-2xl leading-snug font-medium tracking-tight text-white sm:text-3xl">
            For all media and speaking engagement inquiries, please contact:
          </h2>

          <div className="mt-8">
            <p className="text-sm font-normal text-white">Julianne Thorne</p>
            <p className="mt-1 text-xs text-neutral-500">
              Head of Communications
            </p>
          </div>

          <a
            href="mailto:press@legoarch.com"
            className="mt-8 inline-block border-b border-neutral-500 pb-1 text-base font-normal text-white transition-colors hover:border-white hover:text-neutral-300"
          >
            press@legoarch.com
          </a>
        </div>
      </section>
    </div>
  );
}
