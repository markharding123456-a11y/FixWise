"use client";

import { useState } from "react";
import ContractorCard from "@/components/ContractorCard";
import {
  contractors as allContractors,
  getAllTrades,
  getAllLocations,
  searchContractors,
} from "@/lib/contractors-data";

const trades = getAllTrades();
const locations = getAllLocations();

export default function FindAProPage() {
  const [contractors, setContractors] = useState(allContractors);
  const [selectedTrade, setSelectedTrade] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  function handleSearch() {
    setContractors(searchContractors(selectedTrade, selectedLocation));
  }

  function handleReset() {
    setSelectedTrade("");
    setSelectedLocation("");
    setContractors(allContractors);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-fw-gray-900 mb-3">Find a Pro</h1>
        <p className="text-fw-gray-600 text-lg">
          Experienced, semi-retired tradespeople ready to help. Decades of skill,
          fair prices, no runaround.
        </p>
      </div>

      {/* Search filters */}
      <div className="bg-fw-gray-50 rounded-xl p-5 mb-8 flex flex-col sm:flex-row gap-3 items-end">
        <div className="flex-1 w-full">
          <label className="block text-sm font-medium text-fw-gray-700 mb-1">
            Trade / Skill
          </label>
          <select
            value={selectedTrade}
            onChange={(e) => setSelectedTrade(e.target.value)}
            className="w-full border border-fw-gray-300 rounded-lg px-3 py-2.5 text-sm bg-white"
          >
            <option value="">All trades</option>
            {trades.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="flex-1 w-full">
          <label className="block text-sm font-medium text-fw-gray-700 mb-1">
            Location
          </label>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full border border-fw-gray-300 rounded-lg px-3 py-2.5 text-sm bg-white"
          >
            <option value="">All locations</option>
            {locations.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={handleSearch}
            className="flex-1 sm:flex-initial bg-fw-blue hover:bg-fw-blue-light text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-colors"
          >
            Search
          </button>
          <button
            onClick={handleReset}
            className="flex-1 sm:flex-initial bg-fw-gray-200 hover:bg-fw-gray-300 text-fw-gray-700 px-4 py-2.5 rounded-lg font-medium text-sm transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Results */}
      {contractors.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-fw-gray-500 text-lg">
            No contractors found. Try broadening your search.
          </p>
        </div>
      ) : (
        <>
          <p className="text-sm text-fw-gray-500 mb-4">
            {contractors.length} contractor{contractors.length !== 1 ? "s" : ""} found
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {contractors.map((c) => (
              <ContractorCard key={c.id} contractor={c} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
