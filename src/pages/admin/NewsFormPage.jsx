import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Loader2, ArrowLeft, Save } from "lucide-react";
import { Button } from "../../components/ui/button";
import { fetchAdminNewsArticle, saveAdminNewsArticle } from "../../lib/api";

export default function NewsFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [isLoading, setIsLoading] = useState(isEditing);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    category: "Projects",
    date_string: "",
    excerpt: "",
    content: "",
    image_url: "",
    is_published: true,
  });

  useEffect(() => {
    
    async function loadArticle() {
    try {
      const data = await fetchAdminNewsArticle(id);
      setFormData({
        title: data.title || "",
        category: data.category || "Projects",
        date_string: data.date_string || "",
        excerpt: data.excerpt || "",
        content: data.content || "",
        image_url: data.image_url || "",
        is_published: data.is_published ?? true,
      });
    } catch (err) {
      setError("Failed to load article: " + err.message);
    } finally {
      setIsLoading(false);
    }
  }
    if (isEditing) {
      loadArticle();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setError("");

    try {
      await saveAdminNewsArticle(id, formData);
      navigate("/admin/news");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div className="flex py-20 justify-center"><Loader2 className="h-8 w-8 animate-spin text-neutral-900" /></div>;

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/admin/news" className="text-neutral-500 hover:text-neutral-900">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h2 className="font-serif text-2xl font-medium text-neutral-900">
            {isEditing ? "Edit Article" : "New Article"}
          </h2>
        </div>
      </div>

      {error && <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6 rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-700">Article Title</label>
          <input 
            required type="text" name="title" value={formData.title} onChange={handleChange}
            className="h-10 w-full rounded-md border border-neutral-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-700">Category</label>
            <select 
              name="category" value={formData.category} onChange={handleChange}
              className="h-10 w-full rounded-md border border-neutral-300 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
            >
              <option value="Projects">Projects</option>
              <option value="Insights">Insights</option>
              <option value="Awards">Awards</option>
              <option value="Studio">Studio</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-700">Display Date</label>
            <input 
              type="text" name="date_string" value={formData.date_string} onChange={handleChange}
              placeholder="e.g. OCTOBER 14, 2026"
              className="h-10 w-full rounded-md border border-neutral-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-700">Cover Image URL</label>
          <input 
            type="url" name="image_url" value={formData.image_url} onChange={handleChange}
            placeholder="https://..."
            className="h-10 w-full rounded-md border border-neutral-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-700">Excerpt</label>
          <textarea 
            name="excerpt" value={formData.excerpt} onChange={handleChange} rows="2"
            className="w-full resize-none rounded-md border border-neutral-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-700">Full Content</label>
          <textarea 
            name="content" value={formData.content} onChange={handleChange} rows="8"
            className="w-full resize-none rounded-md border border-neutral-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
          />
        </div>

        <div className="flex items-center gap-2 pt-2">
          <input 
            type="checkbox" id="is_published" name="is_published" checked={formData.is_published} onChange={handleChange}
            className="h-4 w-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
          />
          <label htmlFor="is_published" className="text-sm font-medium text-neutral-700">Publish to live website</label>
        </div>

        <div className="flex justify-end gap-3 border-t border-neutral-100 pt-4">
          <Link to="/admin/news">
            <Button type="button" variant="outline">Cancel</Button>
          </Link>
          <Button type="submit" disabled={isSaving} className="gap-2 bg-neutral-900 text-white hover:bg-neutral-800">
            {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save size={16} />}
            Save Article
          </Button>
        </div>
      </form>
    </div>
  );
}