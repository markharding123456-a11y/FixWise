import Database from "better-sqlite3";
import path from "path";

const DB_PATH = path.join(process.cwd(), "data", "fixwise.db");

let db: Database.Database | null = null;

function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma("journal_mode = WAL");
    initTables(db);
  }
  return db;
}

function initTables(database: Database.Database) {
  database.exec(`
    CREATE TABLE IF NOT EXISTS contractors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      trades TEXT NOT NULL,
      city TEXT NOT NULL,
      province_state TEXT NOT NULL,
      years_experience INTEGER,
      bio TEXT,
      email TEXT,
      phone TEXT,
      contact_preference TEXT DEFAULT 'email',
      photo_url TEXT,
      status TEXT DEFAULT 'active',
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT,
      phone TEXT,
      city TEXT,
      province_state TEXT,
      issue_description TEXT NOT NULL,
      preferred_contact TEXT DEFAULT 'email',
      status TEXT DEFAULT 'new',
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS contractor_applications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      trades TEXT NOT NULL,
      city TEXT NOT NULL,
      province_state TEXT NOT NULL,
      years_experience INTEGER,
      bio TEXT,
      status TEXT DEFAULT 'pending',
      created_at TEXT DEFAULT (datetime('now'))
    );
  `);
}

// Contractor functions
export interface Contractor {
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

export function getAllContractors(): Contractor[] {
  return getDb()
    .prepare("SELECT * FROM contractors WHERE status = 'active' ORDER BY name")
    .all() as Contractor[];
}

export function getContractorById(id: number): Contractor | undefined {
  return getDb()
    .prepare("SELECT * FROM contractors WHERE id = ? AND status = 'active'")
    .get(id) as Contractor | undefined;
}

export function searchContractors(trade?: string, location?: string): Contractor[] {
  let query = "SELECT * FROM contractors WHERE status = 'active'";
  const params: string[] = [];

  if (trade) {
    query += " AND LOWER(trades) LIKE LOWER(?)";
    params.push(`%${trade}%`);
  }
  if (location) {
    query += " AND (LOWER(city) LIKE LOWER(?) OR LOWER(province_state) LIKE LOWER(?))";
    params.push(`%${location}%`, `%${location}%`);
  }

  query += " ORDER BY name";
  return getDb().prepare(query).all(...params) as Contractor[];
}

export function getTradesList(): string[] {
  const contractors = getAllContractors();
  const trades = new Set<string>();
  contractors.forEach((c) => {
    c.trades.split(",").forEach((t) => trades.add(t.trim()));
  });
  return [...trades].sort();
}

export function getLocationsList(): string[] {
  const contractors = getAllContractors();
  const locations = new Set<string>();
  contractors.forEach((c) => {
    locations.add(`${c.city}, ${c.province_state}`);
  });
  return [...locations].sort();
}

// Lead functions
export interface Lead {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  city: string | null;
  province_state: string | null;
  issue_description: string;
  preferred_contact: string;
  status: string;
  created_at: string;
}

export function createLead(lead: Omit<Lead, "id" | "status" | "created_at">): Lead {
  const stmt = getDb().prepare(`
    INSERT INTO leads (name, email, phone, city, province_state, issue_description, preferred_contact)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  const result = stmt.run(
    lead.name,
    lead.email,
    lead.phone,
    lead.city,
    lead.province_state,
    lead.issue_description,
    lead.preferred_contact
  );
  return getDb()
    .prepare("SELECT * FROM leads WHERE id = ?")
    .get(result.lastInsertRowid) as Lead;
}

// Contractor application functions
export interface ContractorApplication {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  trades: string;
  city: string;
  province_state: string;
  years_experience: number | null;
  bio: string | null;
  status: string;
  created_at: string;
}

export function createContractorApplication(
  app: Omit<ContractorApplication, "id" | "status" | "created_at">
): ContractorApplication {
  const stmt = getDb().prepare(`
    INSERT INTO contractor_applications (name, email, phone, trades, city, province_state, years_experience, bio)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const result = stmt.run(
    app.name,
    app.email,
    app.phone,
    app.trades,
    app.city,
    app.province_state,
    app.years_experience,
    app.bio
  );
  return getDb()
    .prepare("SELECT * FROM contractor_applications WHERE id = ?")
    .get(result.lastInsertRowid) as ContractorApplication;
}

// Seed data for demo
export function seedDemoContractors() {
  const db = getDb();
  const count = db
    .prepare("SELECT COUNT(*) as count FROM contractors")
    .get() as { count: number };

  if (count.count > 0) return;

  const contractors = [
    {
      name: "Dave Morrison",
      trades: "Plumbing, Water Heaters",
      city: "Vancouver",
      province_state: "BC",
      years_experience: 35,
      bio: "Retired journeyman plumber. 35 years in residential and commercial. Happy to help with leaky faucets, toilet repairs, and water heater replacements. Fair prices, no upselling.",
      email: "dave.m@example.com",
      phone: "604-555-0101",
      contact_preference: "phone",
    },
    {
      name: "Frank Russo",
      trades: "Electrical, Lighting",
      city: "Toronto",
      province_state: "ON",
      years_experience: 40,
      bio: "Master electrician, semi-retired. Panel upgrades, outlet installs, lighting, ceiling fans. Licensed and insured. Been doing this since before LED was a thing.",
      email: "frank.r@example.com",
      phone: "416-555-0202",
      contact_preference: "email",
    },
    {
      name: "Bob Takahashi",
      trades: "Carpentry, Drywall, Painting",
      city: "Calgary",
      province_state: "AB",
      years_experience: 28,
      bio: "General carpenter and finish man. Drywall repair, baseboards, crown moulding, interior painting. I like the small jobs the big companies don't want.",
      email: "bob.t@example.com",
      phone: "403-555-0303",
      contact_preference: "phone",
    },
    {
      name: "Jim Henderson",
      trades: "General Handyman, Maintenance",
      city: "Ottawa",
      province_state: "ON",
      years_experience: 30,
      bio: "Jack of all trades, master of most. Doors, windows, weatherstripping, small repairs, seasonal maintenance. Retired building super — I've seen it all.",
      email: "jim.h@example.com",
      phone: "613-555-0404",
      contact_preference: "email",
    },
    {
      name: "Carlos Mendez",
      trades: "Tiling, Flooring, Bathrooms",
      city: "Miami",
      province_state: "FL",
      years_experience: 25,
      bio: "Tile setter and flooring specialist. Bathroom renos, kitchen backsplashes, floor installs. Quality work at retired-guy prices.",
      email: "carlos.m@example.com",
      phone: "305-555-0505",
      contact_preference: "phone",
    },
    {
      name: "Pete O'Brien",
      trades: "Roofing, Gutters, Exteriors",
      city: "Denver",
      province_state: "CO",
      years_experience: 32,
      bio: "Roofer and exterior man. Shingle repairs, gutter cleaning and install, fascia, soffit. Not doing full roof replacements anymore but happy to patch and maintain.",
      email: "pete.o@example.com",
      phone: "720-555-0606",
      contact_preference: "email",
    },
  ];

  const stmt = db.prepare(`
    INSERT INTO contractors (name, trades, city, province_state, years_experience, bio, email, phone, contact_preference)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const c of contractors) {
    stmt.run(
      c.name, c.trades, c.city, c.province_state,
      c.years_experience, c.bio, c.email, c.phone, c.contact_preference
    );
  }
}
