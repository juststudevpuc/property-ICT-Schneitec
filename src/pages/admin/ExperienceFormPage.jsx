import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Loader2, ArrowLeft, Save } from "lucide-react";
import { Button } from "../../components/ui/button";
import { fetchAdminExperience, saveAdminExperience } from "../../lib/api";

export default function ExperienceFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [isLoading, setIsLoading] = useState(isEditing);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: "", category: "Dining", description: "", image_url: "", cta_link: "/contact", is_published: true, display_order: 0
  });

  useEffect(() => {
    if (isEditing) {
      fetchAdminExperience(id).then(data => {
        setFormData({
          title: data.title || "",
          category: data.category || "Dining",
          description: data.description || "",
          image_url: data.image_url || "",
          cta_link: data.cta_link || "/contact",
          is_published: data.is_published ?? true,
          display_order: data.display_order || 0
        });
        setIsLoading(false);
      }).catch(err => alert(err.message));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await saveAdminExperience(id, formData);
      navigate("/admin/experiences");
    } catch (err) {
      alert(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin" /></div>;

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/admin/experiences" className="text-neutral-500 hover:text-neutral-900"><ArrowLeft size={20} /></Link>
        <h2 className="text-2xl font-serif font-medium">{isEditing ? "Edit Experience" : "New Experience"}</h2>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border rounded-lg p-6 shadow-sm space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Title</label>
            <input required type="text" name="title" value={formData.title} onChange={handleChange} className="w-full h-10 px-3 border rounded-md focus:ring-2 focus:ring-neutral-900 focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Category</label>
            <input required type="text" name="category" value={formData.category} onChange={handleChange} placeholder="e.g. Wellness" className="w-full h-10 px-3 border rounded-md focus:ring-2 focus:ring-neutral-900 focus:outline-none" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Description</label>
          <textarea required name="description" value={formData.description} onChange={handleChange} rows="3" className="w-full p-3 border rounded-md focus:ring-2 focus:ring-neutral-900 focus:outline-none resize-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Image URL (Upload via Media library)</label>
          <input type="url" name="image_url" value={formData.image_url} onChange={handleChange} className="w-full h-10 px-3 border rounded-md focus:ring-2 focus:ring-neutral-900 focus:outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">CTA Link</label>
          <input type="text" name="cta_link" value={formData.cta_link} onChange={handleChange} className="w-full h-10 px-3 border rounded-md focus:ring-2 focus:ring-neutral-900 focus:outline-none" />
        </div>
        <div className="flex items-center gap-2 pt-2">
          <input type="checkbox" id="is_published" name="is_published" checked={formData.is_published} onChange={handleChange} className="h-4 w-4" />
          <label htmlFor="is_published" className="text-sm font-medium text-neutral-700">Publish to live website</label>
        </div>
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Link to="/admin/experiences"><Button type="button" variant="outline">Cancel</Button></Link>
          <Button type="submit" disabled={isSaving} className="bg-neutral-900 text-white hover:bg-neutral-800">
            {isSaving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />} Save Experience
          </Button>
        </div>
      </form>
    </div>
  );
}