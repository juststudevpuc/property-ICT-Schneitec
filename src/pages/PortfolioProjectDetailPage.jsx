import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { projects } from "../lib/projects";

export default function PortfolioProjectDetailPage() {
  const { projectId } = useParams();
  const project = projects.find((item) => item.id === Number(projectId));

  if (!project) {
    return (
      <main className="flex min-h-[70svh] flex-col items-center justify-center gap-5 bg-[#f5f3ed] px-5 text-[#18392f]">
        <h1 className="text-2xl font-medium">Project not found.</h1>
        <Link
          to="/portfolio"
          className="inline-flex items-center gap-2 text-sm transition-colors hover:text-[#bc2525]"
        >
          <ArrowLeft size={16} /> Back to portfolio
        </Link>
      </main>
    );
  }

  return (
    <main className="bg-[#f5f3ed] text-[#18392f]">
      <section className="relative isolate flex min-h-[70svh] items-end overflow-hidden bg-[#283c32] text-white">
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-linear-to-t from-black/80 via-black/25 to-transparent" />
        <div className="mx-auto w-full max-w-7xl px-5 pb-16 pt-40 sm:px-7 sm:pb-20 lg:px-10">
          <Link
            to="/portfolio"
            className="mb-8 inline-flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-white"
          >
            <ArrowLeft size={16} /> All Projects
          </Link>
          <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-[#d4af37] uppercase">
            {project.category}
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="m-0 max-w-4xl font-serif text-4xl leading-tight font-light tracking-tight sm:text-6xl"
          >
            {project.title}
          </motion.h1>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-7 lg:px-10 lg:py-24">
        <div className="mx-auto grid w-full max-w-7xl gap-14 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <h2 className="text-2xl font-medium text-neutral-900">
              Project Overview
            </h2>
            <p className="mt-6 text-base leading-8 text-[#56645b]">
              {project.overview}
            </p>
            <h2 className="mt-12 text-2xl font-medium text-neutral-900">
              Design Approach
            </h2>
            <p className="mt-6 text-base leading-8 text-[#56645b]">
              {project.designApproach}
            </p>
            <h3 className="mt-12 border-b border-neutral-200 pb-4 text-lg font-medium text-neutral-900">
              Project Highlights
            </h3>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {project.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-start gap-3 text-sm leading-6 text-[#56645b]"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#bc2525]" />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-6 border-b border-neutral-200 pb-4 text-lg font-medium text-neutral-900">
              Project Gallery
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {project.gallery.map((image, index) => (
                <figure
                  key={image.label}
                  className={`overflow-hidden bg-neutral-200 ${
                    index === 0 ? "sm:col-span-2" : ""
                  }`}
                >
                  <img
                    src={image.src}
                    alt={image.label}
                    className="aspect-[4/3] h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <figcaption className="sr-only">{image.label}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
