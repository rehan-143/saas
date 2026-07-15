"use client";

import { useEffect, useMemo, useState } from "react";
import { getInquiries, deleteInquiry } from "../../lib/api";

export default function AdminPage() {
  const [inquiries, setInquiries] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [errorMessage, setErrorMessage] = useState("");
  const [search, setSearch] = useState("");
  const [industryFilter, setIndustryFilter] = useState("all");
  const [deletingId, setDeletingId] = useState(null);

  const loadInquiries = async () => {
    setStatus("loading");
    try {
      const res = await getInquiries();
      setInquiries(res.data || []);
      setStatus("ready");
    } catch (err) {
      setErrorMessage(err.message || "Failed to load inquiries.");
      setStatus("error");
    }
  };

  useEffect(() => {
    loadInquiries();
  }, []);

  const industries = useMemo(() => {
    const unique = new Set(inquiries.map((i) => i.industry).filter(Boolean));
    return ["all", ...Array.from(unique)];
  }, [inquiries]);

  const filtered = useMemo(() => {
    return inquiries.filter((inquiry) => {
      const matchesSearch =
        !search ||
        [inquiry.fullName, inquiry.companyName, inquiry.email]
          .filter(Boolean)
          .some((field) => field.toLowerCase().includes(search.toLowerCase()));
      const matchesIndustry = industryFilter === "all" || inquiry.industry === industryFilter;
      return matchesSearch && matchesIndustry;
    });
  }, [inquiries, search, industryFilter]);

  const handleDelete = async (id) => {
    if (!confirm("Delete this inquiry? This cannot be undone.")) return;
    setDeletingId(id);
    try {
      await deleteInquiry(id);
      setInquiries((prev) => prev.filter((i) => i._id !== id));
    } catch (err) {
      alert(err.message || "Failed to delete inquiry.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="container-px mx-auto max-w-6xl py-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold">Product Inquiries</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {inquiries.length} total submissions from the landing page.
            </p>
          </div>
          <a href="/" className="btn-secondary self-start">
            ← Back to site
          </a>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by name, company, or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field sm:max-w-sm"
          />
          <select
            value={industryFilter}
            onChange={(e) => setIndustryFilter(e.target.value)}
            className="input-field sm:max-w-xs"
          >
            {industries.map((ind) => (
              <option key={ind} value={ind}>
                {ind === "all" ? "All industries" : ind}
              </option>
            ))}
          </select>
          <button onClick={loadInquiries} className="btn-secondary sm:ml-auto">
            Refresh
          </button>
        </div>

        {status === "loading" && (
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-10 text-center text-sm text-slate-500">
            Loading inquiries…
          </div>
        )}

        {status === "error" && (
          <div className="rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/30 p-6 text-sm text-red-700 dark:text-red-300">
            {errorMessage} — make sure the backend server is running and{" "}
            <code>NEXT_PUBLIC_API_URL</code> is set correctly.
          </div>
        )}

        {status === "ready" && (
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <table className="w-full text-sm">
              <thead className="bg-slate-100 dark:bg-slate-800 text-left text-xs uppercase text-slate-500 dark:text-slate-400">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Company</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Industry</th>
                  <th className="px-4 py-3">Company Size</th>
                  <th className="px-4 py-3">Submitted</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-4 py-10 text-center text-slate-400">
                      No inquiries match your filters.
                    </td>
                  </tr>
                )}
                {filtered.map((inquiry) => (
                  <tr key={inquiry._id}>
                    <td className="px-4 py-3 font-medium">{inquiry.fullName}</td>
                    <td className="px-4 py-3">{inquiry.companyName}</td>
                    <td className="px-4 py-3">{inquiry.email}</td>
                    <td className="px-4 py-3">{inquiry.phone}</td>
                    <td className="px-4 py-3">{inquiry.industry}</td>
                    <td className="px-4 py-3">{inquiry.companySize}</td>
                    <td className="px-4 py-3 text-slate-400">
                      {inquiry.createdAt ? new Date(inquiry.createdAt).toLocaleDateString() : "—"}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => handleDelete(inquiry._id)}
                        disabled={deletingId === inquiry._id}
                        className="text-red-600 hover:text-red-700 text-xs font-semibold disabled:opacity-50"
                      >
                        {deletingId === inquiry._id ? "Deleting…" : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
