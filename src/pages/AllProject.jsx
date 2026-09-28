import { ArrowDownRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const categories = [
    "All projects",
    "Residential",
    "Commercial",
    "Institutional",
];

const projects = [
    {
        id: 1,
        title: "Modern Luxury Residence",
        category: "Residential",
        image:
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
    },
    {
        id: 2,
        title: "Contemporary Urban Villa",
        category: "Residential",
        image:
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
    },
    {
        id: 3,
        title: "Minimalist Glass House",
        category: "Residential",
        image:
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85",
    },
    {
        id: 4,
        title: "Modern Commercial Building",
        category: "Commercial",
        image:
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85",
    },
    {
        id: 5,
        title: "Contemporary Office Headquarters",
        category: "Commercial",
        image:
            "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85",
    },
    {
        id: 6,
        title: "Luxury Courtyard Residence",
        category: "Residential",
        image:
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",
    },
    {
        id: 7,
        title: "Modern Apartment Complex",
        category: "Residential",
        image:
            "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=85",
    },
    {
        id: 8,
        title: "Contemporary Cultural Center",
        category: "Institutional",
        image:
            "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=85",
    },
];

export default function AllProject() {
    const [activeCategory, setActiveCategory] = useState("All projects");
    const filteredProjects =
        activeCategory === "All projects"
            ? projects
            : projects.filter((project) => project.category === activeCategory);

    return (
        <main className="bg-[#f5f3ed] text-[#18392f]">
            <section
                aria-labelledby="projects-title"
                className="relative isolate flex min-h-[68svh] items-end overflow-hidden bg-[#283c32] text-white"
            >
                <img
                    src="/img/portfolioBanner.png"
                    alt=""
                    className="absolute inset-0 -z-10 h-full w-full object-cover"
                />
                <div className="absolute inset-0 -z-10 bg-linear-to-r from-black/70 via-black/35 to-black/10" />
                <div className="mx-auto w-full max-w-7xl px-5 pb-16 pt-36 sm:px-7 sm:pb-20 lg:px-10 lg:pb-24">
                    <p className="mb-5 text-xs font-medium tracking-[0.18em] text-white/75 uppercase">
                        Selected work · 01—08
                    </p>
                    <h1
                        id="projects-title"
                        className="m-0 max-w-4xl font-manrope text-5xl leading-[1.02] font-medium tracking-tight sm:text-6xl lg:text-7xl"
                    >
                        Spaces shaped
                        <br />
                        around life.
                    </h1>
                    <p className="mt-6 max-w-xl text-base leading-7 text-white/80 sm:text-lg">
                        A collection of places designed with clarity, purpose, and a lasting
                        connection to their surroundings.
                    </p>
                </div>
            </section>

            <section
                aria-labelledby="selected-projects-heading"
                className="px-5 py-14 sm:px-7 sm:py-20 lg:px-10 lg:py-24"
            >
                <div className="mx-auto w-full max-w-7xl">
                    <div className="mb-9 flex flex-col justify-between gap-6 border-b border-[#18392f]/15 pb-6 sm:mb-12 sm:flex-row sm:items-end">
                        <div>
                            <p className="mb-3 text-xs font-medium tracking-[0.16em] text-[#bc2525] uppercase">
                                The portfolio
                            </p>
                            <h2
                                id="selected-projects-heading"
                                className="m-0 font-manrope text-3xl leading-tight font-medium tracking-tight sm:text-4xl"
                            >
                                Selected projects
                            </h2>
                        </div>
                        <span className="text-sm text-[#56645b]">
                            {String(filteredProjects.length).padStart(2, "0")} projects
                        </span>
                    </div>

                    <div
                        aria-label="Filter projects by type"
                        className="mb-9 flex flex-wrap gap-x-7 gap-y-3 sm:mb-12"
                    >
                        {categories.map((category) => {
                            const isActive = activeCategory === category;

                            return (
                                <button
                                    key={category}
                                    type="button"
                                    aria-pressed={isActive}
                                    onClick={() => setActiveCategory(category)}
                                    className={`border-b pb-2 text-sm transition-colors ${
                                        isActive
                                            ? "border-[#bc2525] font-medium text-[#18392f]"
                                            : "border-transparent text-[#777d73] hover:text-[#18392f]"
                                    }`}
                                >
                                    {category}
                                </button>
                            );
                        })}
                    </div>

                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-14">
                        <AnimatePresence mode="popLayout" initial={false}>
                            {filteredProjects.map((project, index) => (
                                <motion.article
                                    key={project.id}
                                    layout
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 8 }}
                                    transition={{ duration: 0.22, delay: index * 0.025 }}
                                    className="group min-w-0"
                                >
                                    <div className="relative aspect-[4/3] overflow-hidden bg-[#dddcd4]">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            loading="lazy"
                                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                                        />
                                        <span className="absolute right-4 bottom-4 grid size-10 place-items-center border border-white/70 bg-black/15 text-white backdrop-blur-sm">
                                            <ArrowDownRight size={18} strokeWidth={1.5} />
                                        </span>
                                    </div>
                                    <div className="mt-4 flex items-start justify-between gap-4 border-b border-[#18392f]/15 pb-4">
                                        <h3 className="m-0 font-manrope text-lg leading-snug font-medium sm:text-xl">
                                            {project.title}
                                        </h3>
                                        <span className="shrink-0 pt-1 text-[10px] font-medium tracking-[0.1em] text-[#777d73] uppercase">
                                            {String(project.id).padStart(2, "0")}
                                        </span>
                                    </div>
                                    <p className="mb-0 mt-3 text-xs tracking-[0.08em] text-[#777d73] uppercase">
                                        {project.category}
                                    </p>
                                </motion.article>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </section>
        </main>
    );
}