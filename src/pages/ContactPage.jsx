import { useState, useEffect } from "react";
import { FaFacebook, FaLinkedinIn, FaTelegram } from "react-icons/fa";
import { Loader2 } from "lucide-react";
import { fetchSettings } from "../lib/api";

export default function ContactPage() {
  const [settings, setSettings] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    async function loadSettings() {
      try {
        const data = await fetchSettings();
        if (!ignore) setSettings(data);
      } catch (error) {
        console.error("Failed to load settings:", error);
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }
    loadSettings();
    return () => { ignore = true; };
  }, []);

  const floorPlanImage = "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80";

  return (
    <div>
      {/* Hero Banner Section */}
      <section
        aria-labelledby="contact-title"
        className="relative isolate flex min-h-dvh items-center justify-center overflow-hidden bg-[#283c32] text-white"
      >
        <img
          src="https://images.unsplash.com/photo-1761403775270-19de21f39faa?q=80&w=870&auto=format&fit=crop"
          alt="Contact Us Hero"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(0,0,0,0.7),rgba(0,0,0,0.35),rgba(0,0,0,0.1))]" />
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center px-5 py-32 text-center sm:px-7 lg:px-10">
          <h1 className="m-0 text-[clamp(2.5rem,10vw,4.5rem)] leading-tight font-medium" id="contact-title">
            Contact Us
          </h1>
          <span aria-hidden="true" className="mt-5 h-1 w-20 bg-white" />
        </div>
      </section>

      {/* Our Studio Section */}
      <section className="bg-white px-5 py-16 sm:px-7 sm:py-24 lg:px-10 lg:py-28">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          
          {/* Left Column: Studio Contact Information */}
          <div>
            <h2 className="text-2xl font-medium tracking-tight text-neutral-900 sm:text-3xl">
              Our Studio
            </h2>

            {isLoading ? (
              <div className="py-12"><Loader2 className="h-6 w-6 animate-spin text-[#bc2525]" /></div>
            ) : (
              <>
                <div className="mt-8">
                  <p className="text-[10px] font-semibold tracking-[0.2em] text-neutral-400 uppercase">ADDRESS</p>
                  <p className="mt-2 text-sm text-neutral-700">
                    {settings?.contact_address || "Street 132, Toul Kork, Phnom Penh"}
                  </p>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <p className="text-[10px] font-semibold tracking-[0.2em] text-neutral-400 uppercase">PHONE</p>
                    <a
                      href={`tel:${settings?.contact_phone?.replace(/\s+/g, "") || ""}`}
                      className="mt-2 inline-block text-sm text-neutral-700 transition-colors hover:text-[#bc2525]"
                    >
                      {settings?.contact_phone || "+855 966 233 546"}
                    </a>
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold tracking-[0.2em] text-neutral-400 uppercase">EMAIL</p>
                    <a
                      href={`mailto:${settings?.contact_email || "hello@schneitecproperty.com"}`}
                      className="mt-2 inline-block border-b border-neutral-300 pb-0.5 text-sm text-neutral-700 transition-colors hover:border-[#bc2525] hover:text-[#bc2525]"
                    >
                      {settings?.contact_email || "hello@schneitecproperty.com"}
                    </a>
                  </div>
                </div>

                <div className="mt-10">
                  <p className="text-[10px] font-semibold tracking-[0.2em] text-neutral-400 uppercase">SOCIALS</p>
                  <div className="mt-3.5 flex items-center gap-5">
                    {settings?.facebook_url && (
                      <a href={settings.facebook_url} target="_blank" rel="noreferrer" className="grid size-11 place-items-center text-sm text-neutral-800 transition-colors hover:text-[#bc2525]">
                        <FaFacebook className="h-4 w-4" />
                      </a>
                    )}
                    {settings?.linkedin_url && (
                      <a href={settings.linkedin_url} target="_blank" rel="noreferrer" className="grid size-11 place-items-center text-sm text-neutral-800 transition-colors hover:text-[#bc2525]">
                        <FaLinkedinIn className="h-4 w-4" />
                      </a>
                    )}
                    {settings?.telegram_url && (
                      <a href={settings.telegram_url} target="_blank" rel="noreferrer" className="grid size-11 place-items-center text-sm text-neutral-800 transition-colors hover:text-[#bc2525]">
                        <FaTelegram className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Right Column: Architectural Floor Plan Image */}
          <div className="border border-neutral-100 bg-[#fafafa] p-6 sm:p-10">
            <img
              src={floorPlanImage}
              alt="Studio architectural floor plan"
              loading="lazy"
              className="aspect-[16/10] w-full object-contain mix-blend-multiply"
            />
          </div>
        </div>
      </section>
    </div>
  );
}