import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Building2, Edit, Loader2, Plus, Trash2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import { deleteAdminProperty, fetchAdminProperties } from "../../lib/api";

export default function PropertiesAdminPage() {
  const location = useLocation();
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);
  const [deletingId, setDeletingId] = useState(null);
  const [loadError, setLoadError] = useState("");
  const [actionError, setActionError] = useState("");
  const notice = location.state?.notice;

  useEffect(() => {
    let isCurrent = true;
    fetchAdminProperties()
      .then((data) => {
        if (isCurrent) {
          setProperties(data);
          setLoadError("");
        }
      })
      .catch((loadError) => {
        if (isCurrent) setLoadError(loadError.message);
      })
      .finally(() => {
        if (isCurrent) setIsLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, [reloadKey]);

  async function handleDelete(property) {
    if (!window.confirm(`Delete "${property.name}"? This action cannot be undone.`)) {
      return;
    }

    setDeletingId(property.id);
    setActionError("");
    try {
      await deleteAdminProperty(property.id);
      setProperties((current) =>
        current.filter((item) => item.id !== property.id),
      );
    } catch (deleteError) {
      setActionError(`Could not delete "${property.name}": ${deleteError.message}`);
    } finally {
      setDeletingId(null);
    }
  }

  function retryLoading() {
    setIsLoading(true);
    setReloadKey((current) => current + 1);
  }

  return (
    <section aria-labelledby="properties-heading">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2
            id="properties-heading"
            className="font-serif text-2xl font-medium text-[#18392f]"
          >
            Properties
          </h2>
          <p className="mt-1 text-sm text-neutral-500">
            Manage hotel destinations and resorts.
          </p>
        </div>
        <Button render={<Link to="/admin/properties/create" />}>
          <Plus aria-hidden="true" />
          Add property
        </Button>
      </div>

      {notice && (
        <div
          className="mb-4 rounded-md border border-green-200 bg-green-50 p-3 text-sm text-green-800"
          role="status"
        >
          {notice}
        </div>
      )}

      {loadError && (
        <div
          className="mb-4 flex flex-col gap-3 rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-800 sm:flex-row sm:items-center sm:justify-between"
          role="alert"
        >
          <span>Could not load properties: {loadError}</span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={retryLoading}
          >
            Retry
          </Button>
        </div>
      )}
      {actionError && (
        <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-800" role="alert">
          {actionError}
        </div>
      )}

      <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-left text-sm text-neutral-600">
            <caption className="sr-only">Manage destination properties</caption>
            <thead className="border-b border-neutral-200 bg-neutral-50 text-neutral-900">
              <tr>
                <th scope="col" className="px-5 py-4 font-medium">Name</th>
                <th scope="col" className="px-5 py-4 font-medium">Category</th>
                <th scope="col" className="px-5 py-4 font-medium">Location</th>
                <th scope="col" className="px-5 py-4 font-medium">Status</th>
                <th scope="col" className="px-5 py-4 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {properties.map((property) => {
                const isDeleting = deletingId === property.id;
                return (
                  <tr key={property.id} className="hover:bg-neutral-50">
                    <th scope="row" className="px-5 py-4 font-medium text-neutral-900">
                      {property.name}
                    </th>
                    <td className="px-5 py-4">{property.category}</td>
                    <td className="px-5 py-4">{property.location}</td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded px-2 py-0.5 text-xs font-medium ${
                          property.is_published
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {property.is_published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <Button
                          render={
                            <Link
                              to={`/admin/properties/${property.id}/edit`}
                              aria-label={`Edit ${property.name}`}
                              title={`Edit ${property.name}`}
                            />
                          }
                          variant="ghost"
                          size="icon"
                        >
                          <Edit aria-hidden="true" />
                        </Button>
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          disabled={Boolean(deletingId)}
                          onClick={() => handleDelete(property)}
                          aria-label={`Delete ${property.name}`}
                          title={`Delete ${property.name}`}
                        >
                          {isDeleting ? (
                            <Loader2 className="animate-spin" aria-hidden="true" />
                          ) : (
                            <Trash2 aria-hidden="true" />
                          )}
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {!isLoading && !loadError && properties.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center">
                    <Building2 className="mx-auto mb-3 h-8 w-8 text-neutral-400" aria-hidden="true" />
                    <p className="font-medium text-neutral-800">No properties yet</p>
                    <p className="mt-1 text-neutral-500">
                      Add a property to start managing destinations.
                    </p>
                  </td>
                </tr>
              )}
              {isLoading && (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center">
                    <span className="inline-flex items-center gap-2" role="status">
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      Loading properties...
                    </span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
