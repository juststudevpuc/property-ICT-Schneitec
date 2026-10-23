import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Loader2, Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import { fetchAdminJobs, deleteAdminJob } from "../../lib/api";

export default function CareersAdminPage() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadJobs() {
      try {
        setIsLoading(true);
        const data = await fetchAdminJobs();
        setJobs(data);
      } catch (err) {
        alert(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    loadJobs();
  }, []);

  async function handleDelete(id, title) {
    if (
      !window.confirm(
        `Are you sure you want to delete the "${title}" position?`,
      )
    )
      return;
    try {
      await deleteAdminJob(id);
      setJobs(jobs.filter((j) => j.id !== id));
    } catch (err) {
      alert("Error deleting job: " + err.message);
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
            Careers
          </h2>
          <p className="text-sm text-neutral-500 mt-1">
            Manage job openings and hiring posts.
          </p>
        </div>
        <Link to="/admin/careers/create">
          <Button className="gap-2 bg-[#18392f] text-white hover:bg-[#283c32]">
            <Plus size={16} /> Add Job Opening
          </Button>
        </Link>
      </div>

      <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm text-neutral-600">
          <thead className="bg-neutral-50 text-neutral-900 border-b border-neutral-200">
            <tr>
              <th className="px-6 py-4 font-medium">Title</th>
              <th className="px-6 py-4 font-medium">Department</th>
              <th className="px-6 py-4 font-medium">Location</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {jobs.map((job) => (
              <tr key={job.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 font-medium text-neutral-900">
                  {job.title}
                </td>
                <td className="px-6 py-4">{job.department}</td>
                <td className="px-6 py-4">{job.location}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${job.is_published ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
                  >
                    {job.is_published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-3">
                    <Link
                      to={`/admin/careers/${job.id}/edit`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit size={18} />
                    </Link>
                    <button
                      onClick={() => handleDelete(job.id, job.title)}
                      className="text-red-600 hover:text-red-800 cursor-pointer"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {jobs.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-8 text-center text-neutral-500"
                >
                  No job openings found. Click "Add Job Opening" to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
