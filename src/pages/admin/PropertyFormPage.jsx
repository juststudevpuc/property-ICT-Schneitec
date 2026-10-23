import { useEffect, useState } from "react";
import { ArrowLeft, Loader2, Plus, Trash2 } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  createAdminProperty,
  fetchAdminProperty,
  updateAdminProperty,
} from "../../lib/api";
import { Button } from "../../components/ui/button";

const emptyProperty = {
  name: "",
  category: "",
  location: "",
  image: "",
  overview: "",
  description: "",
  startingRate: "",
  amenities: "",
  gallery: [],
  isPublished: false,
};

function toFormProperty(property) {
  return {
    name: property.name ?? "",
    category: property.category ?? "",
    location: property.location ?? "",
    image: property.image ?? "",
    overview: property.overview ?? "",
    description: property.description ?? "",
    startingRate: property.starting_rate ?? property.startingRate ?? "",
    amenities: Array.isArray(property.amenities)
      ? property.amenities.join("\n")
      : property.amenities ?? "",
    gallery: Array.isArray(property.gallery)
      ? property.gallery.map((image) => ({
          src: image.src ?? image.url ?? "",
          label: image.label ?? image.alt ?? "",
        }))
      : [],
    isPublished: [true, 1, "1", "true"].includes(
      property.is_published ?? property.isPublished,
    ),
  };
}

function inputClassName(hasError = false) {
  return `min-h-11 w-full rounded-md border bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-[#18392f]/30 ${
    hasError
      ? "border-red-500 focus-visible:border-red-600"
      : "border-neutral-300 focus-visible:border-[#18392f]"
  }`;
}

function Field({ id, label, error, children }) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-sm font-medium text-neutral-800">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

export default function PropertyFormPage() {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyProperty);
  const [isLoading, setIsLoading] = useState(isEditing);
  const [reloadKey, setReloadKey] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (!isEditing) return undefined;

    let isCurrent = true;
    fetchAdminProperty(id)
      .then((property) => {
        if (isCurrent) {
          setForm(toFormProperty(property));
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
  }, [id, isEditing, reloadKey]);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function getFieldError(field) {
    const aliases = {
      startingRate: ["starting_rate", "startingRate"],
      isPublished: ["is_published", "isPublished"],
    };
    const messages = aliases[field] ?? [field];
    const matchingErrors = messages.flatMap((key) => {
      const value = validationErrors[key];
      return Array.isArray(value) ? value : value ? [value] : [];
    });
    return matchingErrors[0] ?? "";
  }

  function describedBy(field) {
    return getFieldError(field) ? `${field}-error` : undefined;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitError("");
    setValidationErrors({});
    setIsSaving(true);

    const payload = {
      name: form.name.trim(),
      category: form.category.trim(),
      location: form.location.trim(),
      image: form.image.trim(),
      overview: form.overview.trim(),
      description: form.description.trim(),
      starting_rate: Number(form.startingRate),
      amenities: form.amenities
        .split("\n")
        .map((amenity) => amenity.trim())
        .filter(Boolean),
      gallery: form.gallery
        .map((image) => ({
          src: image.src.trim(),
          label: image.label.trim(),
        }))
        .filter((image) => image.src),
      is_published: form.isPublished,
    };

    try {
      if (isEditing) {
        await updateAdminProperty(id, payload);
      } else {
        await createAdminProperty(payload);
      }
      navigate("/admin/properties", {
        replace: true,
        state: {
          notice: `Property ${isEditing ? "updated" : "created"} successfully.`,
        },
      });
    } catch (submitError) {
      setSubmitError(submitError.message);
      setValidationErrors(submitError.validationErrors ?? {});
    } finally {
      setIsSaving(false);
    }
  }

  function updateGalleryImage(index, field, value) {
    setForm((current) => ({
      ...current,
      gallery: current.gallery.map((image, imageIndex) =>
        imageIndex === index ? { ...image, [field]: value } : image,
      ),
    }));
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-20" role="status" aria-label="Loading property">
        <Loader2 className="h-8 w-8 animate-spin text-[#18392f]" />
      </div>
    );
  }

  if (isEditing && loadError) {
    return (
      <div className="mx-auto max-w-2xl rounded-lg border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="font-serif text-2xl font-medium text-[#18392f]">
          Unable to load property
        </h2>
        <p className="mt-2 text-sm text-red-700" role="alert">
          {loadError}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setIsLoading(true);
              setReloadKey((current) => current + 1);
            }}
          >
            Try again
          </Button>
          <Button render={<Link to="/admin/properties" />}>
            Back to properties
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <Link
        to="/admin/properties"
        className="mb-5 inline-flex min-h-10 items-center gap-2 text-sm font-medium text-neutral-600 hover:text-[#18392f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#18392f]"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        Back to properties
      </Link>

      <div className="mb-6">
        <h2 className="font-serif text-2xl font-medium text-[#18392f]">
          {isEditing ? "Edit property" : "Create property"}
        </h2>
        <p className="mt-1 text-sm text-neutral-500">
          Manage the details shown on the public destinations pages.
        </p>
      </div>

      {submitError && (
        <div className="mb-5 rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-800" role="alert">
          {submitError}
          {Object.entries(validationErrors).length > 0 && (
            <ul className="mt-2 list-inside list-disc">
              {Object.entries(validationErrors).flatMap(([field, messages]) =>
                (Array.isArray(messages) ? messages : [messages]).map(
                  (message, index) => (
                    <li key={`${field}-${index}`}>
                      {field}: {message}
                    </li>
                  ),
                ),
              )}
            </ul>
          )}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-7 rounded-lg border border-neutral-200 bg-white p-5 shadow-sm sm:p-8"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="name" label="Property name" error={getFieldError("name")}>
            <input
              id="name"
              name="name"
              autoComplete="organization"
              required
              maxLength={255}
              value={form.name}
              onChange={(event) => updateField("name", event.target.value)}
              aria-invalid={Boolean(getFieldError("name"))}
              aria-describedby={describedBy("name")}
              className={inputClassName(Boolean(getFieldError("name")))}
            />
          </Field>
          <Field id="category" label="Category" error={getFieldError("category")}>
            <input
              id="category"
              name="category"
              required
              maxLength={100}
              placeholder="e.g. City Center or Resort"
              value={form.category}
              onChange={(event) => updateField("category", event.target.value)}
              aria-invalid={Boolean(getFieldError("category"))}
              aria-describedby={describedBy("category")}
              className={inputClassName(Boolean(getFieldError("category")))}
            />
          </Field>
          <Field id="location" label="Location" error={getFieldError("location")}>
            <input
              id="location"
              name="location"
              required
              maxLength={255}
              placeholder="City, country"
              value={form.location}
              onChange={(event) => updateField("location", event.target.value)}
              aria-invalid={Boolean(getFieldError("location"))}
              aria-describedby={describedBy("location")}
              className={inputClassName(Boolean(getFieldError("location")))}
            />
          </Field>
          <Field
            id="startingRate"
            label="Starting rate per night"
            error={getFieldError("startingRate")}
          >
            <input
              id="startingRate"
              name="starting_rate"
              type="number"
              min="0"
              step="0.01"
              required
              value={form.startingRate}
              onChange={(event) => updateField("startingRate", event.target.value)}
              aria-invalid={Boolean(getFieldError("startingRate"))}
              aria-describedby={describedBy("startingRate")}
              className={inputClassName(Boolean(getFieldError("startingRate")))}
            />
          </Field>
        </div>

        <Field id="image" label="Cover image URL" error={getFieldError("image")}>
          <input
            id="image"
            name="image"
            type="url"
            required
            maxLength={2048}
            placeholder="https://example.com/property.jpg"
            value={form.image}
            onChange={(event) => updateField("image", event.target.value)}
            aria-invalid={Boolean(getFieldError("image"))}
            aria-describedby={describedBy("image")}
            className={inputClassName(Boolean(getFieldError("image")))}
          />
        </Field>

        <Field id="overview" label="Short overview" error={getFieldError("overview")}>
          <textarea
            id="overview"
            name="overview"
            required
            rows={3}
            maxLength={1000}
            value={form.overview}
            onChange={(event) => updateField("overview", event.target.value)}
            aria-invalid={Boolean(getFieldError("overview"))}
            aria-describedby={describedBy("overview")}
            className={`${inputClassName(Boolean(getFieldError("overview")))} resize-y`}
          />
        </Field>

        <Field id="description" label="Full description" error={getFieldError("description")}>
          <textarea
            id="description"
            name="description"
            required
            rows={6}
            value={form.description}
            onChange={(event) => updateField("description", event.target.value)}
            aria-invalid={Boolean(getFieldError("description"))}
            aria-describedby={describedBy("description")}
            className={`${inputClassName(Boolean(getFieldError("description")))} resize-y`}
          />
        </Field>

        <Field
          id="amenities"
          label="Amenities"
          error={getFieldError("amenities")}
        >
          <textarea
            id="amenities"
            name="amenities"
            rows={4}
            placeholder={"One amenity per line"}
            value={form.amenities}
            onChange={(event) => updateField("amenities", event.target.value)}
            aria-invalid={Boolean(getFieldError("amenities"))}
            aria-describedby={describedBy("amenities")}
            className={`${inputClassName(Boolean(getFieldError("amenities")))} resize-y`}
          />
        </Field>

        <fieldset className="space-y-4">
          <legend className="text-sm font-medium text-neutral-800">Gallery images</legend>
          {form.gallery.map((image, index) => (
            <div
              key={`gallery-${index}`}
              className="grid gap-3 rounded-md border border-neutral-200 p-3 sm:grid-cols-[1fr_1fr_auto] sm:items-end"
            >
              <Field id={`gallery-src-${index}`} label={`Image ${index + 1} URL`}>
                <input
                  id={`gallery-src-${index}`}
                  type="url"
                  value={image.src}
                  onChange={(event) => updateGalleryImage(index, "src", event.target.value)}
                  className={inputClassName()}
                />
              </Field>
              <Field id={`gallery-label-${index}`} label="Image description">
                <input
                  id={`gallery-label-${index}`}
                  value={image.label}
                  onChange={(event) => updateGalleryImage(index, "label", event.target.value)}
                  className={inputClassName()}
                />
              </Field>
              <Button
                type="button"
                variant="destructive"
                size="icon"
                aria-label={`Remove gallery image ${index + 1}`}
                onClick={() =>
                  setForm((current) => ({
                    ...current,
                    gallery: current.gallery.filter((_, imageIndex) => imageIndex !== index),
                  }))
                }
              >
                <Trash2 aria-hidden="true" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              setForm((current) => ({
                ...current,
                gallery: [...current.gallery, { src: "", label: "" }],
              }))
            }
          >
            <Plus aria-hidden="true" />
            Add gallery image
          </Button>
        </fieldset>

        <div className="border-t border-neutral-200 pt-5">
          <label className="flex min-h-11 cursor-pointer items-center gap-3 text-sm font-medium text-neutral-800">
            <input
              type="checkbox"
              name="is_published"
              checked={form.isPublished}
              onChange={(event) => updateField("isPublished", event.target.checked)}
              aria-invalid={Boolean(getFieldError("isPublished"))}
              aria-describedby={describedBy("isPublished")}
              className="h-4 w-4 accent-[#18392f]"
            />
            Publish this property
          </label>
          {getFieldError("isPublished") && (
            <p id="isPublished-error" className="text-sm text-red-700">
              {getFieldError("isPublished")}
            </p>
          )}
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-neutral-200 pt-5 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            disabled={isSaving}
            onClick={() => navigate("/admin/properties")}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSaving || (isEditing && !form.name)}>
            {isSaving ? (
              <>
                <Loader2 className="animate-spin" aria-hidden="true" />
                Saving...
              </>
            ) : (
              isEditing ? "Save changes" : "Create property"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
