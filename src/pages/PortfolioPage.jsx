import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const ITEMS_PER_PAGE = 4;

export default function PortfolioPage() {
  const CATEGORIES = [
    "All",
    "Residential",
    "Commercial",
    "Industrial",
    "Institutional",
  ];

  const projectCards = [
    {
      id: 1,
      title: "Modern Luxury Residence",
      category: "Residential",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
      link: "#project-1",
    },
    {
      id: 2,
      title: "Contemporary Urban Villa",
      category: "Residential",
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80",
      link: "#project-2",
    },
    {
      id: 3,
      title: "Minimalist Glass House",
      category: "Residential",
      image:
        "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1000&q=80",
      link: "#project-3",
    },
    {
      id: 4,
      title: "Modern Commercial Building",
      category: "Commercial",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80",
      link: "#project-4",
    },
    {
      id: 5,
      title: "Contemporary Office Headquarters",
      category: "Commercial",
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80",
      link: "#project-5",
    },
    {
      id: 6,
      title: "Luxury Courtyard Residence",
      category: "Residential",
      image:
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80",
      link: "#project-6",
    },
    {
      id: 7,
      title: "Modern Apartment Complex",
      category: "Residential",
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80",
      link: "#project-7",
    },
    {
      id: 8,
      title: "Contemporary Cultural Center",
      category: "Institutional",
      image:
        "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1000&q=80",
      link: "#project-8",
    },
  ];

  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const filteredProjects =
    activeCategory === "All"
      ? projectCards
      : projectCards.filter((project) => project.category === activeCategory);
  // 2. Slice filtered projects based on visibleCount
  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const hasMoreProjects = visibleCount < filteredProjects.length;
  const canToggleProjects = filteredProjects.length > ITEMS_PER_PAGE;

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setVisibleCount(ITEMS_PER_PAGE); // Reset pagination when switching tabs
  };

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + ITEMS_PER_PAGE);
  };

  const handleLoadBack = () => {
    setVisibleCount(ITEMS_PER_PAGE);
  };
  return (
    <div className="">
      {/* header */}
      <div className="">
        <section
          aria-labelledby="about-title"
          className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-[#283c32] text-white"
        >
          <img
            src="/img/portfolioBanner.png"
            alt=""
            className="absolute inset-0 -z-10 h-full w-full object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-linear-to-r from-black/70 via-black/35 to-black/10" />
          <div className="mx-auto flex w-full max-w-7xl flex-col items-center px-5 py-32 text-center sm:px-7 lg:px-10">
            <h1
              className="m-0 text-5xl font-medium leading-tight sm:text-6xl lg:text-7xl"
              id="about-title"
            >
              Portfolio
            </h1>
            <span aria-hidden="true" className="mt-5 h-1 w-20  bg-white" />
          </div>
        </section>
        {/* Our Project */}
        <section className="bg-[#f5f3ed] px-5 py-16 sm:px-7 sm:py-20 lg:px-10 lg:py-24">
          <div className="mx-auto w-full max-w-7xl">
            {/* Top Row: Title & Category Filters */}
            <div className="mb-12 grid grid-cols-1 items-center gap-6 md:grid-cols-2">
              <div>
                <h2 className="text-2xl font-medium tracking-tight text-neutral-900 sm:text-3xl">
                  Our Projects
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-6 md:justify-end">
                {CATEGORIES.map((category) => {
                  const isActive = activeCategory === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => handleCategoryChange(category)}
                      className={`relative cursor-pointer pb-1.5 text-xs transition-colors sm:text-sm ${
                        isActive
                          ? "font-semibold text-neutral-900"
                          : "font-normal text-neutral-500 hover:text-neutral-900"
                      }`}
                    >
                      {category}
                      {isActive && (
                        <span className="absolute bottom-0 left-0 h-0.5 w-full bg-[#bc2525]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Second Row: 2-Column Project Cards Grid */}
            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2">
                <AnimatePresence initial={false} mode="sync">
                  {visibleProjects.map((project, index) => (
                    <motion.article
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{
                        opacity: 0,
                        y: 24,
                        scale: 0.97,
                        transition: { duration: 0.3, ease: "easeIn" },
                      }}
                      transition={{
                        duration: 0.35,
                        delay: (index % ITEMS_PER_PAGE) * 0.06,
                      }}
                      className="group flex flex-col"
                    >
                      {/* Project Image */}
                      <div className="mb-4 aspect-4/3 w-full overflow-hidden bg-neutral-200">
                        <img
                          src={project.image}
                          alt={project.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      {/* Card Footer */}
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-[10px] font-medium tracking-[0.14em] text-[#bc2525] uppercase">
                            {project.category}
                          </p>
                          <h3 className="mt-1 text-lg font-medium text-neutral-900">
                            {project.title}
                          </h3>
                        </div>

                        <a
                          href={project.link}
                          className="mt-1 inline-flex shrink-0 items-center gap-1.5 text-xs font-medium text-neutral-800 transition-colors hover:text-[#bc2525]"
                        >
                          <span>View Project</span>
                          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                        </a>
                      </div>
                    </motion.article>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              /* Empty State Fallback */
              <div className="py-12 text-center text-sm text-neutral-500">
                No projects found in the {activeCategory} category.
              </div>
            )}

            {/* Bottom Button: Load More Projects */}
            {canToggleProjects && (
              <div className="mt-16 flex justify-center">
                <motion.button
                  type="button"
                  onClick={hasMoreProjects ? handleLoadMore : handleLoadBack}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 22 }}
                  className="cursor-pointer border border-neutral-900 bg-transparent px-8 py-3.5 text-[11px] font-medium tracking-[0.15em] text-neutral-900 uppercase transition-colors hover:bg-neutral-900 hover:text-white"
                >
                  {hasMoreProjects
                    ? "LOAD MORE PROJECTS"
                    : "LOAD BACK PROJECTS"}
                </motion.button>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
