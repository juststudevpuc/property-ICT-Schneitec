import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Loader2, Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import { fetchAdminTeam, deleteAdminTeamMember, fetchAdminAwards, deleteAdminAward } from "../../lib/api";

export default function AboutAdminPage() {
  const [team, setTeam] = useState([]);
  const [awards, setAwards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const [teamData, awardsData] = await Promise.all([fetchAdminTeam(), fetchAdminAwards()]);
        setTeam(teamData);
        setAwards(awardsData);
      } catch (err) {
        alert(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  async function handleDeleteTeam(id, name) {
    if (!window.confirm(`Delete team member "${name}"?`)) return;
    try {
      await deleteAdminTeamMember(id);
      setTeam(team.filter(t => t.id !== id));
    } catch (err) { alert(err.message); }
  }

  async function handleDeleteAward(id, title) {
    if (!window.confirm(`Delete award "${title}"?`)) return;
    try {
      await deleteAdminAward(id);
      setAwards(awards.filter(a => a.id !== id));
    } catch (err) { alert(err.message); }
  }

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-[#18392f]" /></div>;

  return (
    <div className="space-y-12">
      {/* TEAM SECTION */}
      <section>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-medium font-serif text-[#18392f]">Lead Architects</h2>
            <p className="mt-1 text-sm text-neutral-500">Manage the studio leadership team.</p>
          </div>
          <Link to="/admin/about/team/create">
            <Button className="gap-2 bg-[#18392f] text-white hover:bg-[#283c32]"><Plus size={16} /> Add Architect</Button>
          </Link>
        </div>
        <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm">
          <table className="w-full text-left text-sm text-neutral-600">
            <thead className="border-b border-neutral-200 bg-neutral-50 text-neutral-900">
              <tr>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Role</th>
                <th className="px-6 py-4 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {team.map((member) => (
                <tr key={member.id} className="hover:bg-neutral-50">
                  <td className="px-6 py-4 font-medium text-neutral-900">{member.name}</td>
                  <td className="px-6 py-4">{member.role}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-3">
                      <Link to={`/admin/about/team/${member.id}/edit`} className="text-blue-600 hover:text-blue-800"><Edit size={18} /></Link>
                      <button onClick={() => handleDeleteTeam(member.id, member.name)} className="cursor-pointer text-red-600 hover:text-red-800"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* AWARDS SECTION */}
      <section>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-medium font-serif text-[#18392f]">Design Awards</h2>
            <p className="mt-1 text-sm text-neutral-500">Manage studio and project recognitions.</p>
          </div>
          <Link to="/admin/about/awards/create">
            <Button className="gap-2 bg-[#18392f] text-white hover:bg-[#283c32]"><Plus size={16} /> Add Award</Button>
          </Link>
        </div>
        <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm">
          <table className="w-full text-left text-sm text-neutral-600">
            <thead className="border-b border-neutral-200 bg-neutral-50 text-neutral-900">
              <tr>
                <th className="px-6 py-4 font-medium">Title</th>
                <th className="px-6 py-4 font-medium">Year</th>
                <th className="px-6 py-4 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {awards.map((award) => (
                <tr key={award.id} className="hover:bg-neutral-50">
                  <td className="px-6 py-4 font-medium text-neutral-900">{award.title}</td>
                  <td className="px-6 py-4">{award.year}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-3">
                      <Link to={`/admin/about/awards/${award.id}/edit`} className="text-blue-600 hover:text-blue-800"><Edit size={18} /></Link>
                      <button onClick={() => handleDeleteAward(award.id, award.title)} className="cursor-pointer text-red-600 hover:text-red-800"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}