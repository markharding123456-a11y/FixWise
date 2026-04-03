export interface StaticContractor {
  id: number;
  name: string;
  trades: string;
  city: string;
  province_state: string;
  years_experience: number | null;
  bio: string | null;
  email: string | null;
  phone: string | null;
  contact_preference: string;
  photo_url: string | null;
  status: string;
  created_at: string;
}

export const contractors: StaticContractor[] = [
  {
    id: 1,
    name: "Dave Morrison",
    trades: "Plumbing, Water Heaters",
    city: "Vancouver",
    province_state: "BC",
    years_experience: 35,
    bio: "Retired journeyman plumber. 35 years in residential and commercial. Happy to help with leaky faucets, toilet repairs, and water heater replacements. Fair prices, no upselling.",
    email: "dave.m@example.com",
    phone: "604-555-0101",
    contact_preference: "phone",
    photo_url: null,
    status: "active",
    created_at: "2026-04-02",
  },
  {
    id: 2,
    name: "Frank Russo",
    trades: "Electrical, Lighting",
    city: "Toronto",
    province_state: "ON",
    years_experience: 40,
    bio: "Master electrician, semi-retired. Panel upgrades, outlet installs, lighting, ceiling fans. Licensed and insured. Been doing this since before LED was a thing.",
    email: "frank.r@example.com",
    phone: "416-555-0202",
    contact_preference: "email",
    photo_url: null,
    status: "active",
    created_at: "2026-04-02",
  },
  {
    id: 3,
    name: "Bob Takahashi",
    trades: "Carpentry, Drywall, Painting",
    city: "Calgary",
    province_state: "AB",
    years_experience: 28,
    bio: "General carpenter and finish man. Drywall repair, baseboards, crown moulding, interior painting. I like the small jobs the big companies don't want.",
    email: "bob.t@example.com",
    phone: "403-555-0303",
    contact_preference: "phone",
    photo_url: null,
    status: "active",
    created_at: "2026-04-02",
  },
  {
    id: 4,
    name: "Jim Henderson",
    trades: "General Handyman, Maintenance",
    city: "Ottawa",
    province_state: "ON",
    years_experience: 30,
    bio: "Jack of all trades, master of most. Doors, windows, weatherstripping, small repairs, seasonal maintenance. Retired building super — I've seen it all.",
    email: "jim.h@example.com",
    phone: "613-555-0404",
    contact_preference: "email",
    photo_url: null,
    status: "active",
    created_at: "2026-04-02",
  },
  {
    id: 5,
    name: "Carlos Mendez",
    trades: "Tiling, Flooring, Bathrooms",
    city: "Miami",
    province_state: "FL",
    years_experience: 25,
    bio: "Tile setter and flooring specialist. Bathroom renos, kitchen backsplashes, floor installs. Quality work at retired-guy prices.",
    email: "carlos.m@example.com",
    phone: "305-555-0505",
    contact_preference: "phone",
    photo_url: null,
    status: "active",
    created_at: "2026-04-02",
  },
  {
    id: 6,
    name: "Pete O'Brien",
    trades: "Roofing, Gutters, Exteriors",
    city: "Denver",
    province_state: "CO",
    years_experience: 32,
    bio: "Roofer and exterior man. Shingle repairs, gutter cleaning and install, fascia, soffit. Not doing full roof replacements anymore but happy to patch and maintain.",
    email: "pete.o@example.com",
    phone: "720-555-0606",
    contact_preference: "email",
    photo_url: null,
    status: "active",
    created_at: "2026-04-02",
  },
];

export function getAllTrades(): string[] {
  const trades = new Set<string>();
  contractors.forEach((c) => {
    c.trades.split(",").forEach((t) => trades.add(t.trim()));
  });
  return [...trades].sort();
}

export function getAllLocations(): string[] {
  const locations = new Set<string>();
  contractors.forEach((c) => {
    locations.add(`${c.city}, ${c.province_state}`);
  });
  return [...locations].sort();
}

export function getContractorById(id: number): StaticContractor | undefined {
  return contractors.find((c) => c.id === id);
}

export function searchContractors(trade?: string, location?: string): StaticContractor[] {
  return contractors.filter((c) => {
    if (trade && !c.trades.toLowerCase().includes(trade.toLowerCase())) return false;
    if (location) {
      const loc = `${c.city}, ${c.province_state}`.toLowerCase();
      if (!loc.includes(location.toLowerCase())) return false;
    }
    return true;
  });
}
