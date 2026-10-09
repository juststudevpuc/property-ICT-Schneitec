export default function TermsConditionsPage() {
  return (
    <main className="bg-[#fffefa] text-[#18392f]">
      <section className="px-5 pb-20 pt-36 sm:px-7 lg:px-10 lg:pt-48">
        <div className="mx-auto w-full max-w-3xl">
          <h1 className="m-0 text-4xl font-light tracking-tight sm:text-5xl">
            Terms &amp; Conditions
          </h1>
          <p className="mt-4 text-sm text-neutral-500">Last updated: August 2026</p>

          <div className="prose prose-neutral mt-12 max-w-none text-sm leading-7 text-[#56645b] sm:text-base sm:leading-8">
            <h2 className="text-xl font-medium text-neutral-900 mt-8 mb-4">1. Introduction</h2>
            <p>
              Welcome to our luxury property portal. By accessing our website, you agree to be bound by these Terms and Conditions and our Privacy Policy.
            </p>

            <h2 className="text-xl font-medium text-neutral-900 mt-8 mb-4">2. Reservations & Booking</h2>
            <p>
              All bookings made through our platform are subject to availability and written confirmation. Rates are quoted in USD and are subject to applicable taxes and service charges.
            </p>

            <h2 className="text-xl font-medium text-neutral-900 mt-8 mb-4">3. Cancellation Policy</h2>
            <p>
              Cancellations must be made at least 48 hours prior to arrival to avoid a one-night penalty fee. Special promotional rates may have non-refundable conditions.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}