import { useState, useEffect, useRef } from "react";
import { Loader2, UploadCloud, Trash2, Image as ImageIcon } from "lucide-react";
import {
  fetchAdminMedia,
  uploadAdminMedia,
  deleteAdminMedia,
} from "../../lib/api";

export default function MediaAdminPage() {
  const [media, setMedia] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    let isCurrent = true;

    fetchAdminMedia()
      .then((data) => {
        if (isCurrent) {
          setMedia(data);
          setError("");
        }
      })
      .catch((err) => {
        if (isCurrent) setError(err.message);
      })
      .finally(() => {
        if (isCurrent) setIsLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  async function handleFileUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      setError("");
      const newAsset = await uploadAdminMedia(file, file.name);
      setMedia([newAsset, ...media]);
    } catch (err) {
      setError("Upload failed: " + err.message);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this image permanently?")) return;
    try {
      await deleteAdminMedia(id);
      setMedia(media.filter((m) => m.id !== id));
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-neutral-200 pb-5">
        <div>
          <h2 className="font-serif text-2xl font-medium text-neutral-900">
            Media Library
          </h2>
          <p className="mt-1 text-sm text-neutral-500">
            Manage your Cloudinary image assets.
          </p>
        </div>

        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="flex items-center gap-2 rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800 disabled:bg-neutral-400 cursor-pointer"
          >
            {isUploading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <UploadCloud size={16} />
            )}
            {isUploading ? "Uploading..." : "Upload Image"}
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-neutral-900" />
        </div>
      ) : media.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-neutral-300 bg-neutral-50 py-20 text-neutral-500">
          <ImageIcon size={48} className="mb-4 text-neutral-400" />
          <p>No media assets found.</p>
          <p className="text-sm">
            Click upload to add images to your Cloudinary storage.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {media.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-square overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100"
            >
              <img
                src={item.secure_url}
                alt={item.alt_text || "Media asset"}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 flex flex-col justify-between bg-black/60 p-3 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  onClick={() => handleDelete(item.id)}
                  className="self-end rounded-full bg-red-600 p-1.5 text-white hover:bg-red-700 cursor-pointer"
                  title="Delete image"
                >
                  <Trash2 size={14} />
                </button>
                <div className="truncate text-xs text-white">
                  <p className="truncate font-medium">
                    {item.alt_text || "Image"}
                  </p>
                  <p className="text-white/70">
                    {(item.bytes / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
