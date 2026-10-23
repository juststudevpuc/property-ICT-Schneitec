import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Loader2, ArrowLeft, Save } from "lucide-react";
import { Button } from "../../components/ui/button";
import { fetchAdminTeamMember, saveAdminTeamMember } from "../../lib/api";

export default function TeamFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  const [isLoading, setIsLoading] = useState(isEditing);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({ name: "", role: "", image_url: "" });

  useEffect(() => {
    if (isEditing) {
      fetchAdminTeamMember(id).then(data => {
        setFormData({ name: data.name || "", role: data.role || "", image_url: data.image_url || "" });
        setIsLoading(false);
      });
    }
  }, [id]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await saveAdminTeamMember(id, formData);
      navigate("/admin/about");
    } catch (err) { alert(err.message); } finally { setIsSaving(false); }
  };

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin" /></div>;

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/admin/about" className="text-neutral-500 hover:text-neutral-900"><ArrowLeft size={20} /></Link>
        <h2 className="text-2xl font-medium font-serif">{isEditing ? "Edit Architect" : "New Architect"}</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border bg-white p-6 shadow-sm">
        <div><label className="mb-1 block text-sm font-medium">Name</label><input required type="text" name="name" value={formData.name} onChange={handleChange} className="h-10 w-full rounded border px-3" /></div>
        <div><label className="mb-1 block text-sm font-medium">Role</label><input required type="text" name="role" value={formData.role} onChange={handleChange} className="h-10 w-full rounded border px-3" /></div>
        <div><label className="mb-1 block text-sm font-medium">Image URL</label><input type="url" name="image_url" value={formData.image_url} onChange={handleChange} className="h-10 w-full rounded border px-3" /></div>
        <div className="flex justify-end pt-4"><Button type="submit" disabled={isSaving} className="bg-neutral-900 text-white">{isSaving ? <Loader2 className="animate-spin" /> : <Save size={16} />} Save Architect</Button></div>
      </form>
    </div>
  );
}