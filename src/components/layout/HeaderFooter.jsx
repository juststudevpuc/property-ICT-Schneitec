import { FaFacebook, FaLinkedin, FaTelegram } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import RouteSEO from "../shared/RouteSEO";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function HeaderFooter() {
  const location = useLocation();
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const previousScrollY = useRef(0);
  const menuButtonRef = useRef(null);
  const menuPanelRef = useRef(null);
  const discoverItems = [
    { label: "Destinations", to: "/destinations" },
    { label: "Offers", to: "/offers" },
    { label: "Experiences", to: "/experience" },
  ];
  const navItems = [
    { label: "Home", to: "/" },
    { label: "Discover", items: discoverItems },
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

  const isCurrentPage = (item) =>
    location.pathname === item.to ||
    (item.to !== "/" && location.pathname.startsWith(`${item.to}/`)) ||
    (item.label === "Portfolio" &&
      location.pathname.startsWith("/projects/"));

  return (
    <div className="flex min-h-screen flex-col bg-[#f5f3ed] font-sans text-[#18392f]">
      <motion.header
        initial={false}
        animate={{ y: isHeaderHidden ? "-110%" : "0%" }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#18392f]/5 pt-[env(safe-area-inset-top)] text-white shadow-sm backdrop-blur-md"
      >
        <nav
          aria-label="Main navigation"
          className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-7 lg:px-10"
        >
          {/* Brand / Monogram Logo */}
          <Link
            to="/"
            className="group flex w-fit items-center gap-4 focus-visible:outline-none"
          >
            <div className="flex size-10 items-center justify-center border border-[#a8894c]/60 bg-black/20 backdrop-blur-xs transition-colors group-hover:border-[#d4af37]">
              <span className="font-serif text-sm font-normal text-[#a8894c] transition-colors group-hover:text-[#d4af37]">
                H
              </span>
            </div>
            <span className="font-sans text-xs font-normal tracking-[0.22em] text-white/85 uppercase transition-colors group-hover:text-white sm:text-sm">
              Hearth &amp; Home
            </span>
          </Link>

          {/* Navigation Links + Language Selector */}
          <div className="flex items-center gap-3">
            <div className="hidden flex-wrap items-center gap-x-5 gap-y-2 xl:flex xl:gap-x-8">
              {navItems.map((item) => {
                const className =
                  "py-1 font-sans text-[11px] font-normal tracking-[0.22em] text-white/70 uppercase transition-colors duration-200 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a8894c]";

                if (item.items) {
                  const isDiscoverActive = item.items.some(isCurrentPage);

                  return (
                    <DropdownMenu key={item.label}>
                      <DropdownMenuTrigger
                        className={`${className} inline-flex items-center gap-1.5 ${
                          isDiscoverActive ? "text-white" : ""
                        }`}
                        aria-current={isDiscoverActive ? "page" : undefined}
                      >
                        {item.label}
                        <ChevronDown aria-hidden="true" size={13} />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="start"
                        className="min-w-48 border border-[#a8894c]/30 bg-[#18392f] p-2 text-white"
                      >
                        {item.items.map((child) => (
                          <DropdownMenuItem
                            key={child.label}
                            render={<Link to={child.to} />}
                            className="px-3 py-2 text-xs tracking-[0.12em] text-white/75 uppercase focus:bg-white/10 focus:text-white"
                          >
                            {child.label}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  );
                }

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
            <div className="hidden items-center gap-4 xl:flex">
              <button
                type="button"
                className="flex items-center gap-2 text-xs font-normal tracking-[0.12em] text-white/80 uppercase transition-colors hover:text-white"
              >
                <img
                  src="https://flagcdn.com/w20/us.png"
                  alt="US Flag"
                  className="h-3 w-4.5 object-cover opacity-90"
                /                >
                  <span>English</span>
                </button>
            </div>

            <button
              ref={menuButtonRef}
              type="button"
              aria-label={
                isMenuOpen ? "Close navigation menu" : "Open navigation menu"
              }
              aria-expanded={isMenuOpen}
              aria-controls="site-navigation-panel"
              onClick={() => setIsMenuOpen((open) => !open)}
              className="grid size-11 place-items-center border border-white/25 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white xl:hidden"
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
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
              className="ml-auto flex h-full w-full flex-col overflow-y-auto border-l border-[#d6c38a]/25 bg-[#18392f]/5 px-5 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-5 text-white shadow-[0_20px_60px_rgba(0,0,0,0.3)] backdrop-blur-[24px] sm:px-10"
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
                  className="grid size-11 place-items-center border border-white/20 text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  <X size={18} />
                </button>
              </div>

              <nav aria-label="Sidebar navigation" className="mt-8">
                <ul className="m-0 list-none p-0">
                  {navItems.map((item, index) => {
                    if (item.items) {
                      return (
                        <li key={item.label} className="border-b border-white/10">
                          <p className="mb-1 flex items-baseline gap-5 pt-3 font-serif text-2xl text-white sm:text-3xl">
                            <span className="font-sans text-[10px] text-[#c8ad75]">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            {item.label}
                          </p>
                          <ul className="m-0 list-none p-0">
                            {item.items.map((child) => {
                              const isChildCurrent = isCurrentPage(child);

                              return (
                                <li key={child.label}>
                                  <Link
                                    to={child.to}
                                    onClick={closeMenu}
                                    aria-current={
                                      isChildCurrent ? "page" : undefined
                                    }
                                    className={`block min-h-12 py-3 pl-10 font-serif text-xl transition-colors hover:text-white sm:text-2xl ${
                                      isChildCurrent
                                        ? "text-white"
                                        : "text-white/65"
                                    }`}
                                  >
                                    {child.label}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </li>
                      );
                    }

                    const isItemCurrent = isCurrentPage(item);

                    return (
                      <li key={item.label} className="border-b border-white/10">
                        <Link
                          to={item.to}
                          onClick={closeMenu}
                          aria-current={isItemCurrent ? "page" : undefined}
                          className={`flex min-h-14 items-baseline gap-5 py-4 font-serif text-2xl transition-colors hover:text-white sm:text-3xl ${
                            isItemCurrent ? "text-white" : "text-white/65"
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
        <RouteSEO />
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
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-9 py-11 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10 lg:py-16">
          {/* Column 1: Brand */}
          <div className="max-w-xs">
            <Link
              className="font-serif text-2xl font-semibold text-[#18392f] transition-colors hover:text-[#bc2525]"
              to="/"
            >
              Hearth &amp; Home
            </Link>
            <p className="mt-4 leading-relaxed text-[#56645b]">
              Curating unparalleled luxury experiences and unforgettable stays
              across our global destinations. Redefining hospitality since 1994.
            </p>
          </div>

          {/* Column 2: Discover */}
          <div>
            <h2 className="text-lg font-semibold text-[#18392f]">Discover</h2>
            <ul className="mt-4 space-y-3 text-[#56645b]">
              <li>
                <Link
                  className="transition-colors hover:text-[#bc2525]"
                  to="/destinations"
                >
                  Destinations
                </Link>
              </li>
              <li>
                <Link
                  className="transition-colors hover:text-[#bc2525]"
                  to="/offers"
                >
                  Offers &amp; Packages
                </Link>
              </li>
              <li>
                <Link
                  className="transition-colors hover:text-[#bc2525]"
                  to="/experience"
                >
                  Brand Experiences
                </Link>
              </li>
              <li>
                <Link
                  className="transition-colors hover:text-[#bc2525]"
                  to="/about"
                >
                  Our Story
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & Support */}
          <div>
            <h2 className="text-lg font-semibold text-[#18392f]">
              Support &amp; Legal
            </h2>
            <ul className="mt-4 space-y-3 text-[#56645b]">
              <li>
                <Link
                  className="transition-colors hover:text-[#bc2525]"
                  to="/feedback"
                >
                  Guest Feedback
                </Link>
              </li>
              <li>
                <Link
                  className="transition-colors hover:text-[#bc2525]"
                  to="/terms"
                >
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link
                  className="transition-colors hover:text-[#bc2525]"
                  to="/career"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  className="transition-colors hover:text-[#bc2525]"
                  to="/media"
                >
                  Media &amp; News
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Follow */}
          <div>
            <h2 className="text-lg font-semibold text-[#18392f]">Contact Us</h2>
            <div className="mt-4 space-y-2 text-[#56645b]">
              <p>Street 132, Toul Kork, Phnom Penh</p>
              <a
                className="block transition-colors hover:text-[#bc2525]"
                href="mailto:reservations@hearthandhome.com"
              >
                reservations@hearthandhome.com
              </a>
              <a
                className="block transition-colors hover:text-[#bc2525]"
                href="tel:+855966233546"
              >
                +855 966 233 546
              </a>
            </div>

            <div className="mt-6 flex items-center gap-4 text-xl">
              <a
                href="#facebook"
                className="text-neutral-400 transition-colors hover:text-[#bc2525]"
              >
                <FaFacebook />
              </a>
              <a
                href="#linkedin"
                className="text-neutral-400 transition-colors hover:text-[#bc2525]"
              >
                <FaLinkedin />
              </a>
              <a
                href="#telegram"
                className="text-neutral-400 transition-colors hover:text-[#bc2525]"
              >
                <FaTelegram />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#18392f]/10">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 py-6 text-xs text-[#6b756e] sm:flex-row sm:items-center sm:justify-between">
            <span>
              &copy; {new Date().getFullYear()} Hearth &amp; Home Properties.
              All rights reserved.
            </span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="transition-colors cursor-pointer hover:text-[#bc2525]"
            >
              Back to top
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
