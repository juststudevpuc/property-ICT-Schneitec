import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { projects } from "../lib/projects";

export default function ProjectDetailPage() {
  const { projectId } = useParams();
  const project = projects.find((item) => item.id === Number(projectId));

  if (!project) {
    return (
      <main className="flex min-h-[70svh] flex-col items-center justify-center bg-[#f5f3ed] px-5 text-center text-[#18392f]">
        <p className="text-xs font-medium tracking-[0.16em] text-[#bc2525] uppercase">
          Project not found
        </p>
        <h1 className="mt-3 font-manrope text-3xl font-medium sm:text-4xl">
          This project is unavailable.
        </h1>
        <Link
          to="/portfolio"
          className="mt-7 inline-flex items-center gap-2 border-b border-[#18392f]/30 pb-1 text-sm hover:border-[#bc2525] hover:text-[#bc2525]"
        >
          <ArrowLeft size={16} />
          Back to projects
        </Link>
      </main>
    );
  }

  return (
    <main className="bg-[#f5f3ed] text-[#18392f]">
      <section className="relative isolate flex min-h-[68svh] items-end overflow-hidden bg-[#283c32] text-white">
        <img
          src={project.image.replace("w=1000", "w=1800")}
          alt={project.title}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-black/75 via-black/35 to-black/10" />
        <div className="mx-auto w-full max-w-7xl px-5 pb-14 pt-40 sm:px-7 sm:pb-20 lg:px-10">
          <Link
            to="/portfolio"
            className="mb-10 inline-flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-white"
          >
            <ArrowLeft size={16} />
            All projects
          </Link>
          <p className="mb-4 text-xs font-medium tracking-[0.16em] text-white/75 uppercase">
            {project.category} · Project {String(project.id).padStart(2, "0")}
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="m-0 max-w-4xl font-manrope text-4xl leading-tight font-medium tracking-tight sm:text-6xl lg:text-7xl"
          >
            {project.title}
          </motion.h1>
          <p className="mb-0 mt-5 max-w-2xl text-base leading-7 text-white/85 sm:text-lg">
            {project.overview}
          </p>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-7 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(250px,0.6fr)] lg:gap-20">
          <div>
            <p className="mb-3 text-xs font-medium tracking-[0.16em] text-[#bc2525] uppercase">
              Project story
            </p>
            <h2 className="m-0 font-manrope text-3xl leading-tight font-medium tracking-tight sm:text-4xl">
              Thoughtful design, made for its purpose.
            </h2>
            <p className="mb-0 mt-6 max-w-3xl text-base leading-8 text-[#56645b]">
              {project.designApproach}
            </p>

          </div>

          <aside className="border-t border-[#18392f]/20 pt-6 lg:border-t-0 lg:border-l lg:pl-10">
            <p className="mb-6 text-xs font-medium tracking-[0.16em] text-[#bc2525] uppercase">
              Design highlights
            </p>
            <ul className="m-0 list-none p-0">
              {project.highlights.map((highlight, index) => (
                <li
                  key={highlight}
                  className="flex gap-4 border-t border-[#18392f]/15 py-5 text-sm leading-6 text-[#56645b]"
                >
                  <span className="font-medium text-[#18392f]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {highlight}
                </li>
              ))}
            </ul>
            <Link
              to="/portfolio"
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-[#bc2525]"
            >
              <ArrowLeft size={16} />
              Back to all projects
            </Link>
          </aside>
        </div>
      </section>

      <section className="border-t border-[#18392f]/15 px-5 py-14 sm:px-7 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto w-full max-w-7xl">
          <div className="mb-8 flex flex-col gap-3 border-b border-[#18392f]/15 pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-3 text-xs font-medium tracking-[0.16em] text-[#bc2525] uppercase">
                Visual tour
              </p>
              <h2 className="m-0 font-manrope text-3xl font-medium tracking-tight sm:text-4xl">
                Inside the project
              </h2>
            </div>
            <span className="text-sm text-[#56645b]">
              {String(project.gallery.length).padStart(2, "0")} additional views
            </span>
          </div>

          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {project.gallery.map((view, index) => (
              <figure key={view.src} className="group m-0 min-w-0">
                <div className="aspect-4/3 overflow-hidden bg-[#dddcd4]">
                  <img
                    src={view.src}
                    alt={`${project.title}: ${view.label}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <figcaption className="mt-3 flex items-center justify-between gap-4 border-b border-[#18392f]/15 pb-3 text-sm">
                  <span>{view.label}</span>
                  <span className="text-xs text-[#777d73]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}