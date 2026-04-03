"use client";

import { useState } from "react";
import Link from "next/link";

export default function GetHelpPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    province_state: "",
    issue_description: "",
    preferred_contact: "email",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 text-center">
        <div className="w-16 h-16 bg-fw-green-pale rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-fw-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-fw-gray-900 mb-3">Request Submitted</h1>
        <p className="text-fw-gray-600 text-lg mb-8">
          We&apos;ve received your request and will match you with an experienced
          contractor. Expect to hear back within 24 hours.
        </p>
        <Link
          href="/guides"
          className="inline-flex items-center justify-center bg-fw-blue hover:bg-fw-blue-light text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          Browse DIY Guides While You Wait
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-fw-gray-900 mb-3">Get Help</h1>
        <p className="text-fw-gray-600 text-lg">
          Describe your problem and we&apos;ll connect you with an experienced
          contractor who can help. No obligation, no pressure.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-fw-gray-700 mb-1">
              Your Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border border-fw-gray-300 rounded-lg px-3 py-2.5 text-sm"
              placeholder="John Smith"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-fw-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border border-fw-gray-300 rounded-lg px-3 py-2.5 text-sm"
              placeholder="john@example.com"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-fw-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full border border-fw-gray-300 rounded-lg px-3 py-2.5 text-sm"
              placeholder="555-123-4567"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-fw-gray-700 mb-1">
              Preferred Contact
            </label>
            <select
              value={form.preferred_contact}
              onChange={(e) => setForm({ ...form, preferred_contact: e.target.value })}
              className="w-full border border-fw-gray-300 rounded-lg px-3 py-2.5 text-sm bg-white"
            >
              <option value="email">Email</option>
              <option value="phone">Phone</option>
              <option value="either">Either</option>
            </select>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-fw-gray-700 mb-1">
              City
            </label>
            <input
              type="text"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              className="w-full border border-fw-gray-300 rounded-lg px-3 py-2.5 text-sm"
              placeholder="Vancouver"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-fw-gray-700 mb-1">
              Province / State
            </label>
            <input
              type="text"
              value={form.province_state}
              onChange={(e) => setForm({ ...form, province_state: e.target.value })}
              className="w-full border border-fw-gray-300 rounded-lg px-3 py-2.5 text-sm"
              placeholder="BC"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-fw-gray-700 mb-1">
            Describe Your Issue <span className="text-red-500">*</span>
          </label>
          <textarea
            required
            rows={5}
            value={form.issue_description}
            onChange={(e) => setForm({ ...form, issue_description: e.target.value })}
            className="w-full border border-fw-gray-300 rounded-lg px-3 py-2.5 text-sm"
            placeholder="Tell us what's going on — what's broken, leaking, or needs work? The more detail, the better match we can make."
          />
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-fw-orange hover:bg-fw-orange-light text-white px-6 py-3 rounded-lg font-semibold text-lg transition-colors disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Request"}
        </button>

        <p className="text-sm text-fw-gray-400 text-center">
          Free and no obligation. We&apos;ll match you with a contractor who fits your needs.
        </p>
      </form>
    </div>
  );
}
