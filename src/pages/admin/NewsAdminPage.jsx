import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Loader2, Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import { fetchAdminNews, deleteAdminNewsArticle } from "../../lib/api";

export default function NewsAdminPage() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch admin news when the component mounts
    let isCurrent = true;

    fetchAdminNews()
      .then((data) => {
        if (isCurrent) {
          setArticles(data); // Store fetched articles
          setError(""); // Clear previous errors
        }
      })
      .catch((err) => {
        if (isCurrent) setError(err.message); // Handle API errors
      })
      .finally(() => {
        if (isCurrent) setIsLoading(false); // Stop loading
      });

    // Cleanup: prevent state updates after unmount
    return () => {
      isCurrent = false;
    };
  }, []); // Run once when the component mounts

  async function handleDelete(id, title) {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      await deleteAdminNewsArticle(id);
      setArticles(articles.filter((a) => a.id !== id));
    } catch (err) {
      alert("Error deleting article: " + err.message);
    }
  }

  if (isLoading)
    return (
      <div className="flex py-20 justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-neutral-900" />
      </div>
    );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-serif font-medium text-neutral-900">
            News & Press
          </h2>
          <p className="mt-1 text-sm text-neutral-500">
            Manage studio announcements and insights.
          </p>
        </div>
        <Link to="/admin/news/create">
          <Button className="gap-2 bg-neutral-900 text-white hover:bg-neutral-800">
            <Plus size={16} /> Add Article
          </Button>
        </Link>
      </div>

      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm text-neutral-600">
          <thead className="border-b border-neutral-200 bg-neutral-50 text-neutral-900">
            <tr>
              <th className="px-6 py-4 font-medium">Title</th>
              <th className="px-6 py-4 font-medium">Category</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {articles.map((article) => (
              <tr
                key={article.id}
                className="transition-colors hover:bg-neutral-50"
              >
                <td className="px-6 py-4 font-medium text-neutral-900">
                  {article.title}
                </td>
                <td className="px-6 py-4">{article.category}</td>
                <td className="px-6 py-4">{article.date_string || "-"}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      article.is_published
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {article.is_published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-3">
                    <Link
                      to={`/admin/news/${article.id}/edit`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit size={18} />
                    </Link>
                    <button
                      onClick={() => handleDelete(article.id, article.title)}
                      className="cursor-pointer text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {articles.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-8 text-center text-neutral-500"
                >
                  No articles found. Click "Add Article" to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
