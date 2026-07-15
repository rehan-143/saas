const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

async function handleResponse(res) {
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const message = (data && data.message) || `Request failed with status ${res.status}`;
    throw new Error(message);
  }
  return data;
}

export async function createInquiry(payload) {
  const res = await fetch(`${API_BASE_URL}/inquiry`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

export async function getInquiries() {
  const res = await fetch(`${API_BASE_URL}/inquiry`, { cache: "no-store" });
  return handleResponse(res);
}

export async function deleteInquiry(id) {
  const res = await fetch(`${API_BASE_URL}/inquiry/${id}`, { method: "DELETE" });
  return handleResponse(res);
}

export { API_BASE_URL };
