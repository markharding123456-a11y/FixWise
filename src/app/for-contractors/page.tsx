"use client";

import { useState } from "react";

export default function ForContractorsPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    trades: "",
    city: "",
    province_state: "",
    years_experience: "",
    bio: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Static demo — in production this would POST to /api/contractor-applications
      await new Promise((resolve) => setTimeout(resolve, 800));
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
        <h1 className="text-3xl font-bold text-fw-gray-900 mb-3">Application Received</h1>
        <p className="text-fw-gray-600 text-lg">
          Thanks for signing up. We&apos;ll review your application and get back to
          you shortly with next steps.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-fw-gray-900 mb-4">
          Your skills are still in demand.
        </h1>
        <p className="text-lg text-fw-gray-600 max-w-2xl mx-auto">
          Semi-retired? Winding down but still have the itch? FixWise connects
          experienced tradespeople with homeowners who need quality work — on your
          schedule, at your pace.
        </p>
      </div>

      {/* Benefits */}
      <div className="grid sm:grid-cols-3 gap-6 mb-12">
        <div className="bg-fw-blue-pale rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-fw-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="font-semibold text-fw-gray-900 mb-2">Your Schedule</h3>
          <p className="text-sm text-fw-gray-600">Pick the jobs you want, when you want them. No pressure, no minimums.</p>
        </div>
        <div className="bg-fw-green-pale rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-fw-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 className="font-semibold text-fw-gray-900 mb-2">Right-Sized Jobs</h3>
          <p className="text-sm text-fw-gray-600">Homeowners with real problems. The kind of work you enjoy, not mega-projects.</p>
        </div>
        <div className="bg-fw-orange-pale rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-fw-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="font-semibold text-fw-gray-900 mb-2">Experience Valued</h3>
          <p className="text-sm text-fw-gray-600">Homeowners want your decades of knowledge, not the cheapest bid.</p>
        </div>
      </div>

      {/* Application form */}
      <div className="bg-fw-gray-50 rounded-2xl p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-fw-gray-900 mb-6">Join FixWise</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-fw-gray-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-fw-gray-300 rounded-lg px-3 py-2.5 text-sm bg-white"
                placeholder="Dave Morrison"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-fw-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border border-fw-gray-300 rounded-lg px-3 py-2.5 text-sm bg-white"
                placeholder="dave@example.com"
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
                className="w-full border border-fw-gray-300 rounded-lg px-3 py-2.5 text-sm bg-white"
                placeholder="555-123-4567"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-fw-gray-700 mb-1">
                Years of Experience
              </label>
              <input
                type="number"
                value={form.years_experience}
                onChange={(e) => setForm({ ...form, years_experience: e.target.value })}
                className="w-full border border-fw-gray-300 rounded-lg px-3 py-2.5 text-sm bg-white"
                placeholder="25"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-fw-gray-700 mb-1">
              Trades / Skills <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={form.trades}
              onChange={(e) => setForm({ ...form, trades: e.target.value })}
              className="w-full border border-fw-gray-300 rounded-lg px-3 py-2.5 text-sm bg-white"
              placeholder="Plumbing, Water Heaters, General Repair"
            />
            <p className="text-xs text-fw-gray-400 mt-1">Comma-separated list of your trades and specialties</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-fw-gray-700 mb-1">
                City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                className="w-full border border-fw-gray-300 rounded-lg px-3 py-2.5 text-sm bg-white"
                placeholder="Vancouver"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-fw-gray-700 mb-1">
                Province / State <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={form.province_state}
                onChange={(e) => setForm({ ...form, province_state: e.target.value })}
                className="w-full border border-fw-gray-300 rounded-lg px-3 py-2.5 text-sm bg-white"
                placeholder="BC"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-fw-gray-700 mb-1">
              About You
            </label>
            <textarea
              rows={4}
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              className="w-full border border-fw-gray-300 rounded-lg px-3 py-2.5 text-sm bg-white"
              placeholder="Tell homeowners about yourself — your experience, what kind of work you enjoy, why you're still at it."
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
            className="w-full bg-fw-green hover:bg-fw-green-light text-white px-6 py-3 rounded-lg font-semibold text-lg transition-colors disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>

          <p className="text-sm text-fw-gray-400 text-center">
            Free to join. We review every application to keep quality high.
          </p>
        </form>
      </div>
    </div>
  );
}
