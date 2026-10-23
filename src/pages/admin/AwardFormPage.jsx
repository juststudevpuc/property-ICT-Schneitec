import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Loader2, ArrowLeft, Save } from "lucide-react";
import { Button } from "../../components/ui/button";
import { fetchAdminAward, saveAdminAward } from "../../lib/api";

export default function AwardFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  const [isLoading, setIsLoading] = useState(isEditing);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({ title: "", subtitle: "", year: "", icon_name: "Trophy" });

  useEffect(() => {
    if (isEditing) {
      fetchAdminAward(id).then(data => {
        setFormData({ title: data.title || "", subtitle: data.subtitle || "", year: data.year || "", icon_name: data.icon_name || "Trophy" });
        setIsLoading(false);
      });
    }
  }, [id]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await saveAdminAward(id, formData);
      navigate("/admin/about");
    } catch (err) { alert(err.message); } finally { setIsSaving(false); }
  };

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin" /></div>;

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/admin/about" className="text-neutral-500 hover:text-neutral-900"><ArrowLeft size={20} /></Link>
        <h2 className="text-2xl font-medium font-serif">{isEditing ? "Edit Award" : "New Award"}</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border bg-white p-6 shadow-sm">
        <div><label className="mb-1 block text-sm font-medium">Award Title</label><input required type="text" name="title" value={formData.title} onChange={handleChange} className="h-10 w-full rounded border px-3" /></div>
        <div><label className="mb-1 block text-sm font-medium">Subtitle / Project</label><input type="text" name="subtitle" value={formData.subtitle} onChange={handleChange} className="h-10 w-full rounded border px-3" /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="mb-1 block text-sm font-medium">Year</label><input type="text" name="year" value={formData.year} onChange={handleChange} className="h-10 w-full rounded border px-3" /></div>
          <div><label className="mb-1 block text-sm font-medium">Icon Name (e.g. Trophy, Medal)</label><input type="text" name="icon_name" value={formData.icon_name} onChange={handleChange} className="h-10 w-full rounded border px-3" /></div>
        </div>
        <div className="flex justify-end pt-4"><Button type="submit" disabled={isSaving} className="bg-neutral-900 text-white">{isSaving ? <Loader2 className="animate-spin" /> : <Save size={16} />} Save Award</Button></div>
      </form>
    </div>
  );
}