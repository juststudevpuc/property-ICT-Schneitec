import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { submitGuestFeedback } from "../lib/api";

export default function FeedbackPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [hotelVisited, setHotelVisited] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await submitGuestFeedback({
        name,
        email,
        hotel_visited: hotelVisited,
        message,
      });
      setSubmitStatus("success");
      setName("");
      setEmail("");
      setHotelVisited("");
      setMessage("");
    } catch (error) {
      console.error("Feedback submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-[#f5f3ed] text-[#18392f]">
      <section className="px-5 pb-20 pt-36 sm:px-7 lg:px-10 lg:pt-48">
        <div className="mx-auto w-full max-w-3xl border border-neutral-100 bg-white p-5 shadow-sm sm:p-10 md:p-14">
          <h1 className="text-center text-3xl font-light tracking-tight sm:text-4xl">
            Guest Feedback
          </h1>
          <p className="mt-4 text-center text-sm text-[#56645b]">
            We value your experience. Please share your thoughts to help us perfect our service.
          </p>

          {submitStatus === "success" ? (
            <div className="mt-10 flex flex-col items-center py-8 text-center">
              <CheckCircle2 className="mb-4 h-12 w-12 text-green-600" />
              <h2 className="text-xl font-medium text-neutral-900">
                Thank You for Your Feedback
              </h2>
              <p className="mt-2 max-w-md text-sm text-[#56645b]">
                Your message has been received by our management team.
              </p>
              <button
                type="button"
                onClick={() => setSubmitStatus(null)}
                className="mt-6 cursor-pointer text-xs font-bold tracking-widest text-[#bc2525] uppercase hover:underline"
              >
                Submit Another Response
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-12 space-y-6">
              {submitStatus === "error" && (
                <div className="border border-red-200 bg-red-50 p-3 text-xs text-red-600">
                  Failed to submit feedback. Please check your inputs and try again.
                </div>
              )}

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-semibold tracking-wide text-neutral-600 uppercase">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-12 w-full border-b border-neutral-300 bg-transparent text-base focus:border-[#18392f] focus:outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-semibold tracking-wide text-neutral-600 uppercase">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 w-full border-b border-neutral-300 bg-transparent text-base focus:border-[#18392f] focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="hotel" className="text-xs font-semibold tracking-wide text-neutral-600 uppercase">
                  Which property did you visit?
                </label>
                <select
                  id="hotel"
                  value={hotelVisited}
                  onChange={(e) => setHotelVisited(e.target.value)}
                  className="h-12 w-full border-b border-neutral-300 bg-transparent text-base focus:border-[#18392f] focus:outline-none"
                >
                  <option value="">Select a destination...</option>
                  <option value="The Hearth Phnom Penh">Phnom Penh City Center</option>
                  <option value="Hearth River Retreat Kampot">Kampot River Retreat</option>
                  <option value="Siem Reap Heritage Suite">Siem Reap Heritage Suite</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-semibold tracking-wide text-neutral-600 uppercase">
                  Your Experience
                </label>
                <textarea
                  id="message"
                  rows="4"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full resize-none border-b border-neutral-300 bg-transparent py-3 text-base focus:border-[#18392f] focus:outline-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="min-h-14 w-full cursor-pointer rounded-none bg-neutral-900 py-4 text-xs font-bold tracking-[0.15em] text-white uppercase hover:bg-[#bc2525] disabled:bg-neutral-400"
              >
                {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : "Submit Feedback"}
              </Button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}