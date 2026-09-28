import { FaFacebook, FaLinkedin, FaTelegram } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";

export default function HeaderFooter() {
  const navItems = [
    { label: "About Us", to: "/about" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Career", href: "/career" },
    { label: "Media", href: "#media" },
    { label: "Contact Us", href: "#contact" },
  ];
  return (
    <div className="flex min-h-screen flex-col bg-[#f5f3ed] font-sans text-[#18392f]">
      <header className="fixed inset-x-0 top-0 z-50 bg-linear-to-b from-black/85 via-black/55 to-transparent pt-2 pb-6 transition-all duration-300">
        <nav
          aria-label="Main navigation"
          className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-10"
        >
          {/* Brand / Monogram Logo */}
          <Link
            to="/"
            className="group flex w-fit items-center gap-4 focus-visible:outline-none"
          >
            <div className="flex h-10 w-10 items-center justify-center border border-[#a8894c]/60 bg-black/20 backdrop-blur-xs transition-colors group-hover:border-[#d4af37]">
              <span className="font-serif text-sm font-normal text-[#a8894c] transition-colors group-hover:text-[#d4af37]">
                H
              </span>
            </div>
            <span className="font-sans text-xs font-normal tracking-[0.22em] text-white/85 uppercase transition-colors group-hover:text-white sm:text-sm">
              Hearth &amp; Home
            </span>
          </Link>

          {/* Navigation Links + Language Selector */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 sm:justify-end lg:gap-x-9">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 lg:gap-x-8">
              {navItems.map((item) => {
                const className =
                  "py-1 font-sans text-[11px] font-normal tracking-[0.22em] text-white/70 uppercase transition-colors duration-200 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a8894c]";

                return item.to ? (
                  <Link
                    key={item.label}
                    to={item.to}
                    className={className}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    className={className}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>

            {/* Language Selector */}
            <button
              type="button"
              className="flex items-center gap-2 text-xs font-normal tracking-[0.12em] text-white/80 uppercase transition-colors hover:text-white"
            >
              <img
                src="https://flagcdn.com/w20/us.png"
                alt="US Flag"
                className="h-3 w-4.5 object-cover opacity-90"
              />
              <span>English</span>
            </button>
          </div>
        </nav>
      </header>

      <div className="flex-1">
        <Outlet />
      </div>

      <footer className="border-t border-[#18392f]/10 bg-white px-5 text-sm sm:px-7">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-9 py-11 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10 lg:py-14">
          <div className="max-w-xs">
            <Link
              className="font-serif text-2xl font-semibold text-red-600"
              to="/"
            >
              Hearth &amp; Home
            </Link>
            <p className="mt-4 leading-6 text-[#56645b]">
              Innovative architectural solutions for a better tomorrow. Building
              legacies through design excellence since 1932.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-[#18392f] text-2xl">Contact</h2>
            <a
              className="mt-4 inline-block text-[#56645b] transition-colors hover:text-[#bc2525]"
              href="mailto:hello@hearthandhome.com"
            >
              hello@hearthandhome.com
            </a>
          </div>

          <div>
            <h2 className="font-semibold text-[#18392f] text-2xl">
              Quick Links
            </h2>
            <ul className="mt-4 space-y-3 text-[#56645b]">
              <li>
                <a
                  className="transition-colors hover:text-[#bc2525]"
                  href="/#featured-homes"
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  className="transition-colors hover:text-[#bc2525]"
                  href="/#our-way"
                >
                  Our expertise
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold text-[#18392f] text-2xl">Follow Us</h2>
            <p className="mt-4 leading-6 text-[#56645b]">
              For studio updates and recent work, get in touch with our team.
            </p>
            <div className="grid grid-cols-3 max-w-[40%] py-3 text-2xl">
              <a href="" className="text-blue-600 hover:text-blue-700">
                <FaFacebook />
              </a>
              <a href="" className="text-blue-600 hover:text-blue-700">
                <FaLinkedin />
              </a>
              <a href="" className="text-[#0e8de8] hover:text-blue-700">
                <FaTelegram />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#18392f]/10">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 py-5 text-xs text-[#6b756e] sm:flex-row sm:items-center sm:justify-between">
            <span>
              &copy; {new Date().getFullYear()} Hearth &amp; Home. All rights
              reserved.
            </span>
            <a className="transition-colors hover:text-[#bc2525]" href="/#top">
              Back to top
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
