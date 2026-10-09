import { Button } from "@/components/ui/button";

export default function FeedbackPage() {
  return (
    <main className="bg-[#f5f3ed] text-[#18392f]">
      <section className="px-5 pb-20 pt-36 sm:px-7 lg:px-10 lg:pt-48">
        <div className="mx-auto w-full max-w-3xl border border-neutral-100 bg-white p-5 shadow-sm sm:p-10 md:p-14">
          <h1 className="text-3xl font-light tracking-tight text-center sm:text-4xl">
            Guest Feedback
          </h1>
          <p className="mt-4 text-center text-sm text-[#56645b]">
            We value your experience. Please share your thoughts to help us perfect our service.
          </p>

          <form className="mt-12 space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="name" className="text-xs font-semibold tracking-wide text-neutral-600 uppercase">Full Name</label>
                <input id="name" type="text" className="h-12 w-full border-b border-neutral-300 bg-transparent text-base focus:border-[#18392f] focus:outline-none" />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-xs font-semibold tracking-wide text-neutral-600 uppercase">Email Address</label>
                <input id="email" type="email" className="h-12 w-full border-b border-neutral-300 bg-transparent text-base focus:border-[#18392f] focus:outline-none" />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="hotel" className="text-xs font-semibold tracking-wide text-neutral-600 uppercase">Which property did you visit?</label>
              <select id="hotel" className="h-12 w-full border-b border-neutral-300 bg-transparent text-base focus:border-[#18392f] focus:outline-none">
                <option value="">Select a destination...</option>
                <option value="pp">Phnom Penh City Center</option>
                <option value="kp">Kampot River Retreat</option>
                <option value="sr">Siem Reap Heritage Suite</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-xs font-semibold tracking-wide text-neutral-600 uppercase">Your Experience</label>
              <textarea id="message" rows="4" className="w-full resize-none border-b border-neutral-300 bg-transparent py-3 text-base focus:border-[#18392f] focus:outline-none"></textarea>
            </div>

            <Button type="button" className="min-h-14 w-full rounded-none bg-neutral-900 py-4 text-xs font-bold tracking-[0.15em] uppercase text-white hover:bg-[#bc2525]">
              Submit Feedback
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
}