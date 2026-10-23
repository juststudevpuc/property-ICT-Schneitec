import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Loader2, ArrowLeft, Save } from "lucide-react";
import { Button } from "../../components/ui/button";
import { fetchAdminProject, saveAdminProject } from "../../lib/api";

export default function ProjectFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [isLoading, setIsLoading] = useState(isEditing);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    category: "Residential",
    overview: "",
    design_approach: "",
    highlights: [],
    is_published: true,
  });

  const [highlightsInput, setHighlightsInput] = useState("");

  useEffect(() => {
    async function loadProject() {
      try {
        const data = await fetchAdminProject(id);
        setFormData({
          title: data.title || "",
          category: data.category || "Residential",
          overview: data.overview || "",
          design_approach: data.designApproach || "", // mapping from API resource
          highlights: data.highlights || [],
          is_published: data.is_published ?? true,
        });
        setHighlightsInput((data.highlights || []).join(", "));
      } catch (err) {
        setError("Failed to load project: " + err.message);
      } finally {
        setIsLoading(false);
      }
    }
    if (isEditing) {
      loadProject();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleHighlightsChange = (e) => {
    setHighlightsInput(e.target.value);
    const array = e.target.value
      .split(",")
      .map((i) => i.trim())
      .filter((i) => i !== "");
    setFormData((prev) => ({ ...prev, highlights: array }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setError("");

    try {
      await saveAdminProject(id, formData);
      navigate("/admin/projects");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading)
    return (
      <div className="flex py-20 justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-neutral-900" />
      </div>
    );

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center gap-4">
        <Link
          to="/admin/projects"
          className="text-neutral-500 hover:text-neutral-900"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h2 className="text-2xl font-serif font-medium text-neutral-900">
            {isEditing ? "Edit Project" : "New Project"}
          </h2>
        </div>
      </div>

      {error && (
        <div className="text-red-600 bg-red-50 p-3 rounded-md text-sm border border-red-200">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-neutral-200 rounded-lg p-6 shadow-sm space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-700">
              Project Title
            </label>
            <input
              required
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full h-10 px-3 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-700">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full h-10 px-3 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 bg-white"
            >
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="Industrial">Industrial</option>
              <option value="Institutional">Institutional</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-700">
            Overview (Short Summary)
          </label>
          <textarea
            required
            name="overview"
            value={formData.overview}
            onChange={handleChange}
            rows="2"
            className="w-full p-3 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 resize-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-700">
            Design Approach (Full Text)
          </label>
          <textarea
            required
            name="design_approach"
            value={formData.design_approach}
            onChange={handleChange}
            rows="5"
            className="w-full p-3 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 resize-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-700">
            Highlights (Comma-separated)
          </label>
          <input
            type="text"
            value={highlightsInput}
            onChange={handleHighlightsChange}
            placeholder="e.g. Open-plan living, Natural light, Timber finishes"
            className="w-full h-10 px-3 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
          />
          <p className="text-xs text-neutral-500">
            These will display as bullet points.
          </p>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <input
            type="checkbox"
            id="is_published"
            name="is_published"
            checked={formData.is_published}
            onChange={handleChange}
            className="h-4 w-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
          />
          <label
            htmlFor="is_published"
            className="text-sm font-medium text-neutral-700"
          >
            Publish to live website
          </label>
        </div>

        <div className="pt-4 border-t border-neutral-100 flex justify-end gap-3">
          <Link to="/admin/projects">
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            disabled={isSaving}
            className="gap-2 bg-neutral-900 text-white hover:bg-neutral-800"
          >
            {isSaving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save size={16} />
            )}
            Save Project
          </Button>
        </div>
      </form>
    </div>
  );
}
