import { FaFacebook, FaLinkedin, FaTelegram } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function HeaderFooter() {
  const location = useLocation();
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const previousScrollY = useRef(0);
  const menuButtonRef = useRef(null);
  const menuPanelRef = useRef(null);
  const navItems = [
    { label: "Home", to: "/" },
    { label: "About Us", to: "/about" },
    { label: "Portfolio", to: "/portfolio" },
    { label: "Career", to: "/career" },
    { label: "Media", to: "/media" },
    { label: "Contact Us", to: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 80) {
        setIsHeaderHidden(false);
      } else if (currentScrollY > previousScrollY.current) {
        setIsHeaderHidden(true);
      } else if (currentScrollY < previousScrollY.current) {
        setIsHeaderHidden(false);
      }

      previousScrollY.current = currentScrollY;
    };

    previousScrollY.current = window.scrollY;
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menuPanelRef.current?.querySelector("button, a[href]")?.focus();

    const handleMenuKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements = menuPanelRef.current?.querySelectorAll(
        'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
      );
      if (!focusableElements?.length) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener("keydown", handleMenuKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleMenuKeyDown);
    };
  }, [isMenuOpen]);

  const closeMenu = () => {
    setIsMenuOpen(false);
    menuButtonRef.current?.focus();
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f5f3ed] font-sans text-[#18392f]">
      <motion.header
        initial={false}
        animate={{ y: isHeaderHidden ? "-110%" : "0%" }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 bg-linear-to-b from-black/85 via-black/65 to-transparent pt-2 pb-6"
      >
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
                  <Link key={item.label} to={item.to} className={className}>
                    {item.label}
                  </Link>
                ) : (
                  <a key={item.label} href={item.href} className={className}>
                    {item.label}
                  </a>
                );
              })}
            </div>

            {/* Language Selector */}
            <div className="flex items-center gap-4">
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
              <button
                ref={menuButtonRef}
                type="button"
                aria-label={
                  isMenuOpen ? "Close navigation menu" : "Open navigation menu"
                }
                aria-expanded={isMenuOpen}
                aria-controls="site-navigation-panel"
                onClick={() => setIsMenuOpen((open) => !open)}
                className="grid size-10 place-items-center border border-white/25 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-60 bg-black/45 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeMenu}
          >
            <motion.aside
              id="site-navigation-panel"
              ref={menuPanelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="site-navigation-title"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
              className="ml-auto flex h-full w-full max-w-md flex-col border-l border-[#d6c38a]/25 bg-[#18392f]/20 px-7 pb-8 pt-7 text-white shadow-[0_20px_60px_rgba(0,0,0,0.3)] backdrop-blur-[24px] sm:px-10"
            >
              <div className="flex items-center justify-between border-b border-white/15 pb-6">
                <div>
                  <p className="mb-1 text-[10px] font-medium tracking-[0.2em] text-white/50 uppercase">
                    Hearth &amp; Home
                  </p>
                  <h2
                    id="site-navigation-title"
                    className="m-0 font-serif text-2xl font-normal"
                  >
                    Explore
                  </h2>
                </div>
                <button
                  type="button"
                  aria-label="Close navigation menu"
                  onClick={closeMenu}
                  className="grid size-10 place-items-center border border-white/20 text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  <X size={18} />
                </button>
              </div>

              <nav aria-label="Sidebar navigation" className="mt-8">
                <ul className="m-0 list-none p-0">
                  {navItems.map((item, index) => {
                    const isCurrentPage = location.pathname === item.to;

                    return (
                      <li key={item.label} className="border-b border-white/10">
                        <Link
                          to={item.to}
                          onClick={closeMenu}
                          aria-current={isCurrentPage ? "page" : undefined}
                          className={`flex items-baseline gap-5 py-4 font-serif text-2xl transition-colors hover:text-white sm:text-3xl ${
                            isCurrentPage ? "text-white" : "text-white/65"
                          }`}
                        >
                          <span className="font-sans text-[10px] text-[#c8ad75]">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <a
                href="mailto:hello@hearthandhome.com"
                className="mt-auto border-t border-white/15 pt-6 text-sm text-white/65 transition-colors hover:text-white"
              >
                Start a conversation
                <span className="mt-1 block text-xs text-white/45">
                  hello@hearthandhome.com
                </span>
              </a>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-grow">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0.96, y: 2 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
        >
          <Outlet />
        </motion.div>
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
