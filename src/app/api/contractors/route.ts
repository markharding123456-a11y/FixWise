import { NextRequest, NextResponse } from "next/server";
import { searchContractors, getTradesList, getLocationsList, seedDemoContractors } from "@/lib/db";

export async function GET(request: NextRequest) {
  seedDemoContractors();

  const { searchParams } = request.nextUrl;
  const trade = searchParams.get("trade") || undefined;
  const location = searchParams.get("location") || undefined;

  const contractors = searchContractors(trade, location);
  const trades = getTradesList();
  const locations = getLocationsList();

  return NextResponse.json({ contractors, trades, locations });
}
