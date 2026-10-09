import { Button } from "@base-ui/react";
import {
    Briefcase,
  Building2,
  GraduationCap,
  Heart,
  Lightbulb,
  MapPin,
  Monitor,
  Palette,
  Timeline,
} from "lucide-react";
import { useState } from "react";

export default function CareerPage() {
  const PROCESS_STEPS = [
    {
      number: "01",
      title: "Apply",
      description: "Submit portfolio & CV",
      isHighlighted: false,
    },
    {
      number: "02",
      title: "Interview",
      description: "Meet the project leads",
      isHighlighted: false,
    },
    {
      number: "03",
      title: "Offer",
      description: "Welcome to the team",
      isHighlighted: true,
    },
  ];
  const Benefit = [
    {
      logo: GraduationCap,
      title: "Professional Development",
      description:
        "Continuous learning through workshops and industry certifications.",
    },
    {
      logo: Heart,
      title: "Health & Wellness",
      description:
        "A supportive workplace that values well-being, healthy routines, and time to recharge.",
    },
    {
      logo: Timeline,
      title: "Flexible Work",
      description:
        "Flexible ways of working that support focused collaboration and work-life balance.",
    },
    {
      logo: Lightbulb,
      title: "Creative Studio",
      description:
        "A collaborative studio where ideas, materials, and thoughtful design come together.",
    },
  ];

  const DEPARTMENTS = [
    "All Departments",
    "Architecture",
    "Interior Design",
    "Technical",
  ];

  const OPEN_POSITIONS = [
    {
      id: 1,
      title: "Senior Project Architect",
      location: "Phnom Penh",
      type: "Full-time",
      department: "Architecture",
      departmentIcon: Building2,
      applyLink: "#apply-1",
    },
    {
      id: 2,
      title: "Interior Design Lead",
      location: "Kampot",
      type: "Full-time",
      department: "Interior Design",
      departmentIcon: Palette,
      applyLink: "#apply-2",
    },
    {
      id: 3,
      title: "BIM Coordinator",
      location: "Siem Reap",
      type: "Full-time",
      department: "Technical",
      departmentIcon: Monitor,
      applyLink: "#apply-3",
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] =
    useState("All Departments");

  const filteredPositions = OPEN_POSITIONS.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDepartment =
      selectedDepartment === "All Departments" ||
      job.department === selectedDepartment;

    return matchesSearch && matchesDepartment;
  });
  return (
    <div className="">
      {/* header-banner */}
      <section
        aria-labelledby="about-title"
        className="relative isolate flex min-h-dvh items-center justify-center overflow-hidden bg-[#283c32] text-white"
      >
        <img
          src="/img/careerBanner.png"
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-black/70 via-black/35 to-black/10" />
        <div className="mx-auto flex w-full max-w-7xl flex-col px-5 py-32 sm:px-7 sm:py-40 lg:px-10">
          <h1
            className="m-0 max-w-3xl text-[clamp(2.5rem,10vw,4.5rem)] font-medium leading-tight"
            id="about-title"
          >
            Building a future of <br className="hidden sm:block" /> living.
          </h1>
          <span aria-hidden="true" className="font-normal">
            Join our award-winning architectural team and help us shape the
            skylines of tomorrow.
          </span>
        </div>
      </section>
      {/* application process */}
      <section className="bg-black px-5 py-20 text-white sm:px-7 sm:py-28 lg:px-10">
        <div className="mx-auto w-full max-w-4xl">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-medium tracking-tight text-white sm:text-4xl">
              Application Process
            </h2>
            <p className="mt-3 text-xs text-neutral-400 sm:text-sm">
              Simple, transparent, and respectful of your time.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-0">
            {PROCESS_STEPS.map((step) => (
              <div
                key={step.number}
                className="flex flex-col items-center text-center"
              >
                <div className=" flex w-full justify-center border-b border-neutral-800 pb-4">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-medium ${
                      step.isHighlighted
                        ? "bg-[#d91b1b] text-white"
                        : "bg-white text-black"
                    }`}
                  >
                    {step.number}
                  </div>
                </div>

                <div className="pt-5">
                  <h3 className="text-xs font-medium text-white sm:text-sm">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-[11px] text-neutral-500">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/*  */}
      <section className="bg-white px-5 py-16 sm:px-7 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column: Text Content */}
          <div className="flex flex-col items-start">
            <p className="mb-3 text-xs font-semibold tracking-[0.18em] text-[#bc2525] uppercase">
              OUR PHILOSOPHY
            </p>

            <h2 className="text-3xl leading-tight font-medium tracking-tight text-neutral-900 sm:text-4xl">
              A Culture of Conscious Design
            </h2>

            <div className="mt-6 space-y-5 text-sm leading-relaxed text-neutral-600 sm:text-base">
              <p>
                At LEGO, we believe that architecture is more than just
                buildings; it&apos;s about creating spaces that inspire,
                connect, and endure. Our studio environment is built on the
                foundations of collaboration, intellectual curiosity, and
                aesthetic excellence.
              </p>
              <p>
                We foster a culture where every voice is heard, from junior
                designers to senior partners. We believe that the best ideas
                often emerge at the intersection of different perspectives and
                technical expertise.
              </p>
            </div>

            <Button className="mt-8 cursor-pointer rounded-none bg-neutral-900 px-8 py-6 text-xs font-medium tracking-[0.15em] text-white uppercase transition-colors hover:bg-[#bc2525]">
              Our Story
            </Button>
          </div>

          {/* Right Column: Studio Image */}
          <div className="aspect-4/3 w-full overflow-hidden bg-neutral-200 shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Design studio team collaborating"
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>
      </section>
      {/*  */}
      <section className="bg-[#f5f3ed] px-5 py-16 sm:px-7 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto w-full max-w-7xl">
          <div className="mb-10 sm:mb-12">
            <p className="mb-3 text-xs font-semibold tracking-[0.18em] text-[#bc2525] uppercase">
              At Hearth &amp; Home
            </p>
            <h2 className="m-0 font-serif text-3xl font-medium text-[#18392f] sm:text-4xl">
              Benefits &amp; Perks
            </h2>
            <span
              aria-hidden="true"
              className="mt-4 block h-1 w-16 bg-[#bc2525]"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Benefit.map((benefit) => {
              const BenefitIcon = benefit.logo;

              return (
                <article
                  className="min-h-56 border-t-2 border-[#bc2525]/70 bg-white p-6 sm:p-7"
                  key={benefit.title}
                >
                  <BenefitIcon
                    className="size-7 text-[#bc2525]"
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />
                  <h3 className="mb-3 mt-6 font-serif text-xl font-medium text-[#18392f]">
                    {benefit.title}
                  </h3>
                  <p className="m-0 text-sm leading-6 text-[#56645b]">
                    {benefit.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      {/*  */}
      <section className="bg-white px-5 py-16 sm:px-7 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto w-full max-w-6xl">
          {/* Top Row: Title & Search/Filter Controls */}
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <h2 className="text-3xl font-medium tracking-tight text-neutral-900 sm:text-4xl">
                Open Positions
              </h2>
              <p className="mt-2 text-xs text-neutral-500 sm:text-sm">
                Find your next challenge and grow with us.
              </p>
            </div>

            {/* Search Input & Department Select */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search roles..."
                aria-label="Search roles"
                className="h-12 w-full rounded-xs border border-neutral-200 bg-white px-3.5 text-base text-neutral-800 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none sm:w-56"
              />

              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                aria-label="Filter by department"
                className="h-12 w-full cursor-pointer rounded-xs bg-neutral-200/70 px-3.5 text-base font-medium text-neutral-800 focus:outline-none sm:w-44"
              >
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Job Listings Stack */}
          {filteredPositions.length > 0 ? (
            <div className="space-y-4">
              {filteredPositions.map((job) => {
                const DeptIcon = job.departmentIcon;
                return (
                  <div
                    key={job.id}
                    className="flex flex-col justify-between gap-6 border border-neutral-100 bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)] transition-colors hover:border-neutral-300 sm:flex-row sm:items-center sm:px-8 sm:py-7"
                  >
                    {/* Left: Job Title & Metadata */}
                    <div>
                      <h3 className="text-base font-medium text-neutral-900 sm:text-lg">
                        {job.title}
                      </h3>

                      <div className="mt-2.5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-neutral-500">
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-neutral-500" />
                          {job.location}
                        </span>

                        <span className="inline-flex items-center gap-1.5">
                          <Briefcase className="h-3.5 w-3.5 text-neutral-500" />
                          {job.type}
                        </span>

                        <span className="inline-flex items-center gap-1.5">
                          <DeptIcon className="h-3.5 w-3.5 text-neutral-500" />
                          {job.department}
                        </span>
                      </div>
                    </div>

                    {/* Right: Apply Now Button */}
                    <a
                      href={job.applyLink}
                      className="inline-flex min-h-12 w-full shrink-0 items-center justify-center border border-neutral-800 bg-transparent px-6 py-2.5 text-[10px] font-medium tracking-[0.14em] text-neutral-900 uppercase transition-colors hover:bg-neutral-900 hover:text-white sm:w-fit"
                    >
                      APPLY NOW
                    </a>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Empty State */
            <div className="border border-dashed border-neutral-200 py-12 text-center text-sm text-neutral-500">
              No open positions match your search criteria.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
