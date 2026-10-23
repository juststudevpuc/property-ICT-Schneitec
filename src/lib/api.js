const API_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchProperties() {
  const response = await fetch(`${API_URL}/properties`, {
    headers: {
      Accept: "application/json",
    },
  });
  if (!response.ok) throw new Error("Failed to fetch properties");

  const json = await response.json();
  return json.data;
}

export async function fetchProperty(id) {
  const response = await fetch(`${API_URL}/properties/${id}`, {
    headers: {
      Accept: "application/json",
    },
  });
  if (!response.ok) throw new Error("Failed to fetch property");

  const json = await response.json();
  return json.data;
}

export async function submitBookingInquiry(formData) {
  const response = await fetch(`${API_URL}/inquiries/booking`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const json = await response.json();
  if (!response.ok) throw new Error(json.message || "Failed to submit inquiry");

  return json;
}

export function getAdminToken() {
  return localStorage.getItem("admin_token");
}

export async function adminLogin(email, password) {
  const response = await fetch(`${API_URL}/admin/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const json = await response.json();
  if (!response.ok) throw new Error(json.message || "Login failed");

  localStorage.setItem("admin_token", json.token);
  localStorage.setItem("admin_user", JSON.stringify(json.user));

  return json;
}

export function adminLogout() {
  localStorage.removeItem("admin_token");
  localStorage.removeItem("admin_user");
}

async function adminPropertyRequest(path, options = {}) {
  const token = getAdminToken();
  if (!token) {
    throw new Error("Your admin session has expired. Please sign in again.");
  }
  if (!API_URL) {
    throw new Error("The API base URL is not configured.");
  }

  const headers = new Headers(options.headers);
  headers.set("Accept", "application/json");
  headers.set("Authorization", `Bearer ${token}`);
  if (options.body !== undefined && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });
  const responseText = await response.text();
  let payload = null;
  if (responseText) {
    try {
      payload = JSON.parse(responseText);
    } catch {
      throw new Error("The server returned an invalid response.");
    }
  }

  if (!response.ok) {
    const error = new Error(
      payload?.message || `Request failed with status ${response.status}.`,
    );
    error.validationErrors = payload?.errors ?? {};
    throw error;
  }

  return payload;
}

function unwrapAdminProperty(payload) {
  return payload && typeof payload === "object" && "data" in payload
    ? payload.data
    : payload;
}

export async function fetchAdminProperties() {
  const payload = await adminPropertyRequest("/admin/properties");
  const properties = unwrapAdminProperty(payload);
  if (!Array.isArray(properties)) {
    throw new Error("The server returned an invalid properties list.");
  }
  return properties;
}

export async function fetchAdminProperty(id) {
  const payload = await adminPropertyRequest(
    `/admin/properties/${encodeURIComponent(id)}`,
  );
  const property = unwrapAdminProperty(payload);
  if (!property || typeof property !== "object" || Array.isArray(property)) {
    throw new Error("The server returned an invalid property.");
  }
  return property;
}

export async function createAdminProperty(property) {
  const payload = await adminPropertyRequest("/admin/properties", {
    method: "POST",
    body: JSON.stringify(property),
  });
  return unwrapAdminProperty(payload);
}

export async function updateAdminProperty(id, property) {
  const payload = await adminPropertyRequest(
    `/admin/properties/${encodeURIComponent(id)}`,
    {
      method: "PUT",
      body: JSON.stringify(property),
    },
  );
  return unwrapAdminProperty(payload);
}

export async function deleteAdminProperty(id) {
  await adminPropertyRequest(
    `/admin/properties/${encodeURIComponent(id)}`,
    { method: "DELETE" },
  );
  return true;
}

// ============
export async function fetchAdminProjects() {
  const token = getAdminToken();
  const response = await fetch(`${API_URL}/admin/projects`, {
    headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Failed to fetch projects');
  const json = await response.json();
  return json.data;
}

export async function fetchAdminProject(id) {
  const token = getAdminToken();
  const response = await fetch(`${API_URL}/admin/projects/${id}`, {
    headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Failed to fetch project details');
  const json = await response.json();
  return json.data;
}

export async function saveAdminProject(id, projectData) {
  const token = getAdminToken();
  const isUpdate = !!id;
  const url = isUpdate ? `${API_URL}/admin/projects/${id}` : `${API_URL}/admin/projects`;
  
  const response = await fetch(url, {
    method: isUpdate ? 'PUT' : 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(projectData)
  });
  
  const json = await response.json();
  if (!response.ok) throw new Error(json.message || 'Failed to save project');
  return json.data;
}

export async function deleteAdminProject(id) {
  const token = getAdminToken();
  const response = await fetch(`${API_URL}/admin/projects/${id}`, {
    method: 'DELETE',
    headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Failed to delete project');
  return true;
}
// =============
export async function fetchAdminNews() {
  const token = getAdminToken();
  const response = await fetch(`${API_URL}/admin/news`, {
    headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Failed to fetch news articles');
  const json = await response.json();
  return json.data;
}

export async function fetchAdminNewsArticle(id) {
  const token = getAdminToken();
  const response = await fetch(`${API_URL}/admin/news/${id}`, {
    headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Failed to fetch news details');
  const json = await response.json();
  return json.data;
}

export async function saveAdminNewsArticle(id, newsData) {
  const token = getAdminToken();
  const isUpdate = !!id;
  const url = isUpdate ? `${API_URL}/admin/news/${id}` : `${API_URL}/admin/news`;
  
  const response = await fetch(url, {
    method: isUpdate ? 'PUT' : 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(newsData)
  });
  
  const json = await response.json();
  if (!response.ok) throw new Error(json.message || 'Failed to save news article');
  return json.data;
}

export async function deleteAdminNewsArticle(id) {
  const token = getAdminToken();
  const response = await fetch(`${API_URL}/admin/news/${id}`, {
    method: 'DELETE',
    headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Failed to delete news article');
  return true;
}
// --- INBOX ADMIN API ---

export async function fetchAdminInquiries() {
  const token = getAdminToken();
  const response = await fetch(`${API_URL}/admin/inbox/inquiries`, {
    headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Failed to fetch booking inquiries');
  const json = await response.json();
  return json.data;
}

export async function fetchAdminFeedback() {
  const token = getAdminToken();
  const response = await fetch(`${API_URL}/admin/inbox/feedback`, {
    headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Failed to fetch guest feedback');
  const json = await response.json();
  return json.data;
}

// --- MEDIA ADMIN API ---

export async function fetchAdminMedia() {
  const token = getAdminToken();
  const response = await fetch(`${API_URL}/admin/media`, {
    headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Failed to fetch media');
  const json = await response.json();
  return json.data; // Paginator returns items in 'data'
}

export async function uploadAdminMedia(file, altText = "") {
  const token = getAdminToken();
  const formData = new FormData();
  formData.append('file', file);
  formData.append('alt_text', altText);
  formData.append('subfolder', 'cms_uploads');

  const response = await fetch(`${API_URL}/admin/media/upload`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: formData // Do NOT set Content-Type header for FormData, the browser handles the boundary
  });
  
  const json = await response.json();
  if (!response.ok) throw new Error(json.message || 'Upload failed');
  return json.data;
}

export async function deleteAdminMedia(id) {
  const token = getAdminToken();
  const response = await fetch(`${API_URL}/admin/media/${id}`, {
    method: 'DELETE',
    headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Failed to delete media');
  return true;
}

// --- PUBLIC PROJECTS API ---

export async function fetchProjects() {
  const response = await fetch(`${API_URL}/projects`, {
    headers: { 'Accept': 'application/json' }
  });
  if (!response.ok) throw new Error('Failed to fetch projects');

  const json = await response.json();
  return json.data;
}

export async function fetchProject(id) {
  const response = await fetch(`${API_URL}/projects/${id}`, {
    headers: { 'Accept': 'application/json' }
  });
  if (!response.ok) throw new Error('Failed to fetch project details');

  const json = await response.json();
  return json.data;
}

// --- PUBLIC NEWS & FEEDBACK API ---

export async function fetchNews() {
  const response = await fetch(`${API_URL}/news`, {
    headers: { 'Accept': 'application/json' }
  });
  if (!response.ok) throw new Error('Failed to fetch news articles');

  const json = await response.json();
  return json.data;
}

export async function submitGuestFeedback(feedbackData) {
  const response = await fetch(`${API_URL}/feedback`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(feedbackData)
  });

  const json = await response.json();
  if (!response.ok) throw new Error(json.message || 'Failed to submit feedback');

  return json;
}

// --- PROPERTY ADMIN API (CREATE/EDIT) ---

// export async function fetchAdminProperty(id) {
//   const token = getAdminToken();
//   const response = await fetch(`${API_URL}/admin/properties/${id}`, {
//     headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${token}` }
//   });
//   if (!response.ok) throw new Error('Failed to fetch property details');
//   const json = await response.json();
//   return json.data;
// }

// export async function saveAdminProperty(id, propertyData) {
//   const token = getAdminToken();
//   const isUpdate = !!id;
//   const url = isUpdate ? `${API_URL}/admin/properties/${id}` : `${API_URL}/admin/properties`;
  
//   const response = await fetch(url, {
//     method: isUpdate ? 'PUT' : 'POST',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`
//     },
//     body: JSON.stringify(propertyData)
//   });
  
//   const json = await response.json();
//   if (!response.ok) throw new Error(json.message || 'Failed to save property');
//   return json.data;
// }

// --- UNIFIED PUBLIC CONTENT API ---

export async function fetchOffers() {
  const response = await fetch(`${API_URL}/offers`, { headers: { 'Accept': 'application/json' } });
  if (!response.ok) throw new Error('Failed to fetch offers');
  const json = await response.json();
  return json.data;
}

export async function fetchJobs() {
  const response = await fetch(`${API_URL}/jobs`, { headers: { 'Accept': 'application/json' } });
  if (!response.ok) throw new Error('Failed to fetch jobs');
  const json = await response.json();
  return json.data;
}

export async function fetchExperiences() {
  const response = await fetch(`${API_URL}/experiences`, { headers: { 'Accept': 'application/json' } });
  if (!response.ok) throw new Error('Failed to fetch experiences');
  const json = await response.json();
  return json.data;
}

// --- OFFERS ADMIN API ---

export async function fetchAdminOffers() {
  const token = getAdminToken();
  const response = await fetch(`${API_URL}/admin/offers`, {
    headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Failed to fetch offers');
  const json = await response.json();
  return json.data;
}

export async function fetchAdminOffer(id) {
  const token = getAdminToken();
  const response = await fetch(`${API_URL}/admin/offers/${id}`, {
    headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Failed to fetch offer details');
  const json = await response.json();
  return json.data;
}

export async function saveAdminOffer(id, offerData) {
  const token = getAdminToken();
  const isUpdate = !!id;
  const url = isUpdate ? `${API_URL}/admin/offers/${id}` : `${API_URL}/admin/offers`;
  
  const response = await fetch(url, {
    method: isUpdate ? 'PUT' : 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(offerData)
  });
  
  const json = await response.json();
  if (!response.ok) throw new Error(json.message || 'Failed to save offer');
  return json.data;
}

export async function deleteAdminOffer(id) {
  const token = getAdminToken();
  const response = await fetch(`${API_URL}/admin/offers/${id}`, {
    method: 'DELETE',
    headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Failed to delete offer');
  return true;
}

// --- EXPERIENCES ADMIN API ---

export async function fetchAdminExperiences() {
  const token = getAdminToken();
  const response = await fetch(`${API_URL}/admin/experiences`, {
    headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Failed to fetch experiences');
  const json = await response.json();
  return json.data;
}

export async function fetchAdminExperience(id) {
  const token = getAdminToken();
  const response = await fetch(`${API_URL}/admin/experiences/${id}`, {
    headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Failed to fetch experience details');
  const json = await response.json();
  return json.data;
}

export async function saveAdminExperience(id, experienceData) {
  const token = getAdminToken();
  const isUpdate = !!id;
  const url = isUpdate ? `${API_URL}/admin/experiences/${id}` : `${API_URL}/admin/experiences`;
  
  const response = await fetch(url, {
    method: isUpdate ? 'PUT' : 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(experienceData)
  });
  
  const json = await response.json();
  if (!response.ok) throw new Error(json.message || 'Failed to save experience');
  return json.data;
}

export async function deleteAdminExperience(id) {
  const token = getAdminToken();
  const response = await fetch(`${API_URL}/admin/experiences/${id}`, {
    method: 'DELETE',
    headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Failed to delete experience');
  return true;
}

// --- CAREERS (JOB OPENINGS) ADMIN API ---

export async function fetchAdminJobs() {
  const token = getAdminToken();
  const response = await fetch(`${API_URL}/admin/jobs`, {
    headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Failed to fetch jobs');
  const json = await response.json();
  return json.data;
}

export async function fetchAdminJob(id) {
  const token = getAdminToken();
  const response = await fetch(`${API_URL}/admin/jobs/${id}`, {
    headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Failed to fetch job details');
  const json = await response.json();
  return json.data;
}

export async function saveAdminJob(id, jobData) {
  const token = getAdminToken();
  const isUpdate = !!id;
  const url = isUpdate ? `${API_URL}/admin/jobs/${id}` : `${API_URL}/admin/jobs`;
  
  const response = await fetch(url, {
    method: isUpdate ? 'PUT' : 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(jobData)
  });
  
  const json = await response.json();
  if (!response.ok) throw new Error(json.message || 'Failed to save job');
  return json.data;
}

export async function deleteAdminJob(id) {
  const token = getAdminToken();
  const response = await fetch(`${API_URL}/admin/jobs/${id}`, {
    method: 'DELETE',
    headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Failed to delete job');
  return true;
}

// --- SITE SETTINGS ADMIN API ---

export async function fetchAdminSettings() {
  const token = getAdminToken();
  const response = await fetch(`${API_URL}/admin/settings`, {
    headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Failed to fetch settings');
  const json = await response.json();
  return json.data;
}

export async function saveAdminSettings(settingsData) {
  const token = getAdminToken();
  const response = await fetch(`${API_URL}/admin/settings`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(settingsData)
  });
  const json = await response.json();
  if (!response.ok) throw new Error(json.message || 'Failed to save settings');
  return true;
}

// --- TEAM ADMIN API ---
export async function fetchAdminTeam() {
  const token = getAdminToken();
  const response = await fetch(`${API_URL}/admin/team`, { headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${token}` } });
  if (!response.ok) throw new Error('Failed to fetch team');
  return (await response.json()).data;
}

export async function fetchAdminTeamMember(id) {
  const token = getAdminToken();
  const response = await fetch(`${API_URL}/admin/team/${id}`, { headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${token}` } });
  if (!response.ok) throw new Error('Failed to fetch team member');
  return (await response.json()).data;
}

export async function saveAdminTeamMember(id, data) {
  const token = getAdminToken();
  const isUpdate = !!id;
  const url = isUpdate ? `${API_URL}/admin/team/${id}` : `${API_URL}/admin/team`;
  const response = await fetch(url, {
    method: isUpdate ? 'PUT' : 'POST',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(data)
  });
  const json = await response.json();
  if (!response.ok) throw new Error(json.message || 'Failed to save team member');
  return json.data;
}

export async function deleteAdminTeamMember(id) {
  const token = getAdminToken();
  const response = await fetch(`${API_URL}/admin/team/${id}`, { method: 'DELETE', headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${token}` } });
  if (!response.ok) throw new Error('Failed to delete team member');
  return true;
}

// --- AWARDS ADMIN API ---
export async function fetchAdminAwards() {
  const token = getAdminToken();
  const response = await fetch(`${API_URL}/admin/awards`, { headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${token}` } });
  if (!response.ok) throw new Error('Failed to fetch awards');
  return (await response.json()).data;
}

export async function fetchAdminAward(id) {
  const token = getAdminToken();
  const response = await fetch(`${API_URL}/admin/awards/${id}`, { headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${token}` } });
  if (!response.ok) throw new Error('Failed to fetch award details');
  return (await response.json()).data;
}

export async function saveAdminAward(id, data) {
  const token = getAdminToken();
  const isUpdate = !!id;
  const url = isUpdate ? `${API_URL}/admin/awards/${id}` : `${API_URL}/admin/awards`;
  const response = await fetch(url, {
    method: isUpdate ? 'PUT' : 'POST',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(data)
  });
  const json = await response.json();
  if (!response.ok) throw new Error(json.message || 'Failed to save award');
  return json.data;
}

export async function deleteAdminAward(id) {
  const token = getAdminToken();
  const response = await fetch(`${API_URL}/admin/awards/${id}`, { method: 'DELETE', headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${token}` } });
  if (!response.ok) throw new Error('Failed to delete award');
  return true;
}

// --- PUBLIC COMPANY PROFILE API ---

export async function fetchTeam() {
  const response = await fetch(`${API_URL}/team`, { headers: { 'Accept': 'application/json' } });
  if (!response.ok) throw new Error('Failed to fetch team');
  return (await response.json()).data;
}

export async function fetchAwards() {
  const response = await fetch(`${API_URL}/awards`, { headers: { 'Accept': 'application/json' } });
  if (!response.ok) throw new Error('Failed to fetch awards');
  return (await response.json()).data;
}

export async function fetchSettings() {
  const response = await fetch(`${API_URL}/settings`, { headers: { 'Accept': 'application/json' } });
  if (!response.ok) throw new Error('Failed to fetch settings');
  return (await response.json()).data;
}