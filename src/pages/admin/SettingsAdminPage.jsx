import { useState, useEffect } from "react";
import { Loader2, Save } from "lucide-react";
import { Button } from "../../components/ui/button";
import { fetchAdminSettings, saveAdminSettings } from "../../lib/api";

export default function SettingsAdminPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [formData, setFormData] = useState({
    contact_email: "hello@schneitecproperty.com",
    contact_phone: "+855 966 233 546",
    contact_address: "Street 132, Toul Kork, Phnom Penh",
    facebook_url: "",
    linkedin_url: "",
    telegram_url: "",
  });

  useEffect(() => {
    fetchAdminSettings()
      .then(data => {
        if (data && Object.keys(data).length > 0) {
          setFormData(prev => ({ ...prev, ...data }));
        }
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setError("");
    setSuccessMsg("");
    try {
      await saveAdminSettings(formData);
      setSuccessMsg("Settings saved successfully!");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-[#18392f]" /></div>;

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="text-2xl font-serif font-medium text-[#18392f]">Site Settings</h2>
        <p className="text-sm text-neutral-500 mt-1">Manage global contact information and social links.</p>
      </div>

      {error && <div className="bg-red-50 text-red-600 p-3 rounded border border-red-200">{error}</div>}
      {successMsg && <div className="bg-green-50 text-green-700 p-3 rounded border border-green-200">{successMsg}</div>}

      <form onSubmit={handleSubmit} className="bg-white border border-neutral-200 rounded-lg p-6 shadow-sm space-y-8">
        
        {/* Contact Info Section */}
        <div className="space-y-4">
          <h3 className="font-medium text-lg border-b border-neutral-100 pb-2">Contact Information</h3>
          <div>
            <label className="block text-sm font-medium mb-1 text-neutral-700">Email Address</label>
            <input type="email" name="contact_email" value={formData.contact_email} onChange={handleChange} className="w-full h-10 px-3 border border-neutral-300 rounded-md focus:ring-2 focus:ring-neutral-900 focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-neutral-700">Phone Number</label>
            <input type="text" name="contact_phone" value={formData.contact_phone} onChange={handleChange} className="w-full h-10 px-3 border border-neutral-300 rounded-md focus:ring-2 focus:ring-neutral-900 focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-neutral-700">Physical Address</label>
            <input type="text" name="contact_address" value={formData.contact_address} onChange={handleChange} className="w-full h-10 px-3 border border-neutral-300 rounded-md focus:ring-2 focus:ring-neutral-900 focus:outline-none" />
          </div>
        </div>

        {/* Social Links Section */}
        <div className="space-y-4">
          <h3 className="font-medium text-lg border-b border-neutral-100 pb-2">Social Media Links</h3>
          <div>
            <label className="block text-sm font-medium mb-1 text-neutral-700">Facebook URL</label>
            <input type="url" name="facebook_url" value={formData.facebook_url} onChange={handleChange} className="w-full h-10 px-3 border border-neutral-300 rounded-md focus:ring-2 focus:ring-neutral-900 focus:outline-none" placeholder="https://facebook.com/..." />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-neutral-700">LinkedIn URL</label>
            <input type="url" name="linkedin_url" value={formData.linkedin_url} onChange={handleChange} className="w-full h-10 px-3 border border-neutral-300 rounded-md focus:ring-2 focus:ring-neutral-900 focus:outline-none" placeholder="https://linkedin.com/in/..." />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-neutral-700">Telegram URL</label>
            <input type="url" name="telegram_url" value={formData.telegram_url} onChange={handleChange} className="w-full h-10 px-3 border border-neutral-300 rounded-md focus:ring-2 focus:ring-neutral-900 focus:outline-none" placeholder="https://t.me/..." />
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-neutral-100">
          <Button type="submit" disabled={isSaving} className="bg-neutral-900 text-white hover:bg-neutral-800 gap-2">
            {isSaving ? <Loader2 className="animate-spin" size={16}/> : <Save size={16}/>} 
            Save Settings
          </Button>
        </div>
      </form>
    </div>
  );
}