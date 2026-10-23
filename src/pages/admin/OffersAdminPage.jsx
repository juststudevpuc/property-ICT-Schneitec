import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Loader2, Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import { fetchAdminOffers, deleteAdminOffer } from "../../lib/api";

export default function OffersAdminPage() {
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadOffers() {
      try {
        setIsLoading(true);
        const data = await fetchAdminOffers();
        setOffers(data);
      } catch (err) {
        alert(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    loadOffers();
  }, []);

  async function handleDelete(id, title) {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      await deleteAdminOffer(id);
      setOffers(offers.filter((o) => o.id !== id));
    } catch (err) {
      alert("Error deleting offer: " + err.message);
    }
  }

  if (isLoading)
    return (
      <div className="flex py-20 justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#18392f]" />
      </div>
    );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-serif font-medium text-[#18392f]">
            Special Offers
          </h2>
          <p className="text-sm text-neutral-500 mt-1">
            Manage promotional packages.
          </p>
        </div>
        <Link to="/admin/offers/create">
          <Button className="gap-2 bg-[#18392f] text-white hover:bg-[#283c32]">
            <Plus size={16} /> Add Offer
          </Button>
        </Link>
      </div>

      <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm text-neutral-600">
          <thead className="bg-neutral-50 text-neutral-900 border-b border-neutral-200">
            <tr>
              <th className="px-6 py-4 font-medium">Title</th>
              <th className="px-6 py-4 font-medium">Validity</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {offers.map((offer) => (
              <tr key={offer.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 font-medium text-neutral-900">
                  {offer.title}
                </td>
                <td className="px-6 py-4">
                  {offer.validity || offer.validity_text}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${offer.is_published ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
                  >
                    {offer.is_published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-3">
                    <Link
                      to={`/admin/offers/${offer.id}/edit`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit size={18} />
                    </Link>
                    <button
                      onClick={() => handleDelete(offer.id, offer.title)}
                      className="text-red-600 hover:text-red-800 cursor-pointer"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
