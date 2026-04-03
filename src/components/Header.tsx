"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-fw-blue text-white shadow-lg">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="shrink-0">
              <rect width="32" height="32" rx="6" fill="#ed8936" />
              <path d="M8 24V12l4-4h8l4 4v12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M13 24v-6h6v6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M16 8v4" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <circle cx="16" cy="15" r="1.5" fill="white" />
            </svg>
            <span className="text-xl font-bold tracking-tight">FixWise</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/guides" className="hover:text-fw-orange-light transition-colors font-medium">
              DIY Guides
            </Link>
            <Link href="/find-a-pro" className="hover:text-fw-orange-light transition-colors font-medium">
              Find a Pro
            </Link>
            <Link href="/about" className="hover:text-fw-orange-light transition-colors font-medium">
              About
            </Link>
            <Link
              href="/get-help"
              className="bg-fw-orange hover:bg-fw-orange-light text-white px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              Get Help
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen ? (
                <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link
              href="/guides"
              onClick={() => setMenuOpen(false)}
              className="block py-2 px-3 rounded hover:bg-fw-blue-light transition-colors"
            >
              DIY Guides
            </Link>
            <Link
              href="/find-a-pro"
              onClick={() => setMenuOpen(false)}
              className="block py-2 px-3 rounded hover:bg-fw-blue-light transition-colors"
            >
              Find a Pro
            </Link>
            <Link
              href="/about"
              onClick={() => setMenuOpen(false)}
              className="block py-2 px-3 rounded hover:bg-fw-blue-light transition-colors"
            >
              About
            </Link>
            <Link
              href="/get-help"
              onClick={() => setMenuOpen(false)}
              className="block py-2 px-3 bg-fw-orange rounded-lg text-center font-semibold"
            >
              Get Help
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
