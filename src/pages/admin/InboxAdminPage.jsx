import { useState, useEffect } from "react";
import { Loader2, Mailbox } from "lucide-react";
import { fetchAdminInquiries, fetchAdminFeedback } from "../../lib/api";

export default function InboxAdminPage() {
  const [activeTab, setActiveTab] = useState("inquiries"); // 'inquiries' or 'feedback'
  const [inquiries, setInquiries] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false; // 1. Track if this effect run is still active

    async function loadInboxData() {
      try {
        setIsLoading(true);
        const [inquiriesData, feedbackData] = await Promise.all([
          fetchAdminInquiries(),
          fetchAdminFeedback(),
        ]);

        // 2. Only update state if the component is still mounted
        if (!ignore) {
          setInquiries(inquiriesData);
          setFeedbacks(feedbackData);
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    loadInboxData();

    // 3. Cleanup function runs if the user navigates away early
    return () => {
      ignore = true;
    };
  }, []);

  if (isLoading)
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-neutral-900" />
      </div>
    );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#18392f]/10 text-[#18392f]">
          <Mailbox size={20} />
        </div>
        <div>
          <h2 className="font-serif text-2xl font-medium text-neutral-900">
            Inbox
          </h2>
          <p className="mt-1 text-sm text-neutral-500">
            Review booking requests and guest feedback.
          </p>
        </div>
      </div>

      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-6 border-b border-neutral-200">
        <button
          onClick={() => setActiveTab("inquiries")}
          className={`pb-3 text-sm font-medium transition-colors ${
            activeTab === "inquiries"
              ? "border-b-2 border-[#18392f] text-[#18392f]"
              : "text-neutral-500 hover:text-neutral-900"
          }`}
        >
          Booking Inquiries ({inquiries.length})
        </button>
        <button
          onClick={() => setActiveTab("feedback")}
          className={`pb-3 text-sm font-medium transition-colors ${
            activeTab === "feedback"
              ? "border-b-2 border-[#18392f] text-[#18392f]"
              : "text-neutral-500 hover:text-neutral-900"
          }`}
        >
          Guest Feedback ({feedbacks.length})
        </button>
      </div>

      {/* Tables */}
      <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm">
        {activeTab === "inquiries" ? (
          <table className="w-full text-left text-sm text-neutral-600">
            <thead className="border-b border-neutral-200 bg-neutral-50 text-neutral-900">
              <tr>
                <th className="px-6 py-4 font-medium">Date Submitted</th>
                <th className="px-6 py-4 font-medium">Property</th>
                <th className="px-6 py-4 font-medium">Dates</th>
                <th className="px-6 py-4 font-medium">Guests</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {inquiries.map((inquiry) => (
                <tr
                  key={inquiry.id}
                  className="transition-colors hover:bg-neutral-50"
                >
                  <td className="px-6 py-4">
                    {new Date(inquiry.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 font-medium text-neutral-900">
                    {inquiry.property?.name || "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    {inquiry.check_in} to {inquiry.check_out}
                  </td>
                  <td className="px-6 py-4">{inquiry.guests}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex rounded bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                      {inquiry.status}
                    </span>
                  </td>
                </tr>
              ))}
              {inquiries.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-8 text-center text-neutral-500"
                  >
                    No booking inquiries yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        ) : (
          <table className="w-full text-left text-sm text-neutral-600">
            <thead className="border-b border-neutral-200 bg-neutral-50 text-neutral-900">
              <tr>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Guest Name</th>
                <th className="px-6 py-4 font-medium">Email</th>
                <th className="px-6 py-4 font-medium">Message</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {feedbacks.map((feedback) => (
                <tr
                  key={feedback.id}
                  className="transition-colors hover:bg-neutral-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(feedback.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 font-medium text-neutral-900 whitespace-nowrap">
                    {feedback.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <a
                      href={`mailto:${feedback.email}`}
                      className="text-blue-600 hover:underline"
                    >
                      {feedback.email}
                    </a>
                  </td>
                  <td className="px-6 py-4 min-w-[300px]">
                    {feedback.message}
                  </td>
                </tr>
              ))}
              {feedbacks.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-8 text-center text-neutral-500"
                  >
                    No feedback submitted yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
