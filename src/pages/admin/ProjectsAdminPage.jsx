import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Loader2, Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import { fetchAdminProjects, deleteAdminProject } from "../../lib/api";

export default function ProjectsAdminPage() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProjects() {
      try {
        setIsLoading(true);
        const data = await fetchAdminProjects();
        setProjects(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    loadProjects();
  }, []);

  async function handleDelete(id, title) {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      await deleteAdminProject(id);
      setProjects(projects.filter((p) => p.id !== id));
    } catch (err) {
      alert("Error deleting project: " + err.message);
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
            Projects
          </h2>
          <p className="text-sm text-neutral-500 mt-1">
            Manage your architectural portfolio.
          </p>
        </div>
        <Link to="/admin/projects/create">
          <Button className="gap-2 bg-neutral-900 text-white hover:bg-neutral-800">
            <Plus size={16} /> Add Project
          </Button>
        </Link>
      </div>

      {error && (
        <div className="text-red-600 bg-red-50 p-3 rounded-md text-sm border border-red-200">
          {error}
        </div>
      )}

      <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm text-neutral-600">
          <thead className="bg-neutral-50 text-neutral-900 border-b border-neutral-200">
            <tr>
              <th className="px-6 py-4 font-medium">Title</th>
              <th className="px-6 py-4 font-medium">Category</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {projects.map((project) => (
              <tr
                key={project.id}
                className="hover:bg-neutral-50 transition-colors"
              >
                <td className="px-6 py-4 font-medium text-neutral-900">
                  {project.title}
                </td>
                <td className="px-6 py-4">{project.category}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      project.is_published
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {project.is_published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-3">
                    <Link
                      to={`/admin/projects/${project.id}/edit`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit size={18} />
                    </Link>
                    <button
                      onClick={() => handleDelete(project.id, project.title)}
                      className="text-red-600 hover:text-red-800 cursor-pointer"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="px-6 py-8 text-center text-neutral-500"
                >
                  No projects found. Click "Add Project" to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
