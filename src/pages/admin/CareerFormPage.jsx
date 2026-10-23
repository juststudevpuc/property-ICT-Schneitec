import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Loader2, ArrowLeft, Save } from "lucide-react";
import { Button } from "../../components/ui/button";
import { fetchAdminJob, saveAdminJob } from "../../lib/api";

export default function CareerFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [isLoading, setIsLoading] = useState(isEditing);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: "", department: "Architecture", location: "Phnom Penh", type: "Full-time", apply_link: "", is_published: true, display_order: 0
  });

  useEffect(() => {
    if (isEditing) {
      fetchAdminJob(id).then(data => {
        setFormData({
          title: data.title || "",
          department: data.department || "Architecture",
          location: data.location || "Phnom Penh",
          type: data.type || "Full-time",
          apply_link: data.apply_link || "",
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
      await saveAdminJob(id, formData);
      navigate("/admin/careers");
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
        <Link to="/admin/careers" className="text-neutral-500 hover:text-neutral-900"><ArrowLeft size={20} /></Link>
        <h2 className="text-2xl font-serif font-medium">{isEditing ? "Edit Job" : "New Job Opening"}</h2>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border rounded-lg p-6 shadow-sm space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Job Title</label>
            <input required type="text" name="title" value={formData.title} onChange={handleChange} className="w-full h-10 px-3 border rounded-md focus:ring-2 focus:ring-neutral-900 focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Department</label>
            <select name="department" value={formData.department} onChange={handleChange} className="w-full h-10 px-3 border rounded-md focus:ring-2 focus:ring-neutral-900 focus:outline-none bg-white">
              <option value="Architecture">Architecture</option>
              <option value="Interior Design">Interior Design</option>
              <option value="Technical">Technical</option>
              <option value="Operations">Operations</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Location</label>
            <input required type="text" name="location" value={formData.location} onChange={handleChange} placeholder="e.g. Phnom Penh" className="w-full h-10 px-3 border rounded-md focus:ring-2 focus:ring-neutral-900 focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Employment Type</label>
            <select name="type" value={formData.type} onChange={handleChange} className="w-full h-10 px-3 border rounded-md focus:ring-2 focus:ring-neutral-900 focus:outline-none bg-white">
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
            </select>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Application Link (URL)</label>
          <input type="url" name="apply_link" value={formData.apply_link} onChange={handleChange} placeholder="https://..." className="w-full h-10 px-3 border rounded-md focus:ring-2 focus:ring-neutral-900 focus:outline-none" />
        </div>
        
        <div className="flex items-center gap-2 pt-2">
          <input type="checkbox" id="is_published" name="is_published" checked={formData.is_published} onChange={handleChange} className="h-4 w-4" />
          <label htmlFor="is_published" className="text-sm font-medium text-neutral-700">Publish to live website</label>
        </div>
        
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Link to="/admin/careers"><Button type="button" variant="outline">Cancel</Button></Link>
          <Button type="submit" disabled={isSaving} className="bg-neutral-900 text-white hover:bg-neutral-800">
            {isSaving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />} Save Job
          </Button>
        </div>
      </form>
    </div>
  );
}