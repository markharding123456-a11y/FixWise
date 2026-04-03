import { NextRequest, NextResponse } from "next/server";
import { createContractorApplication } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.name || !body.email || !body.trades || !body.city || !body.province_state) {
      return NextResponse.json(
        { error: "Name, email, trades, city, and province/state are required" },
        { status: 400 }
      );
    }

    const application = createContractorApplication({
      name: body.name,
      email: body.email,
      phone: body.phone || null,
      trades: body.trades,
      city: body.city,
      province_state: body.province_state,
      years_experience: body.years_experience || null,
      bio: body.bio || null,
    });

    return NextResponse.json({ success: true, application });
  } catch (error) {
    console.error("Error creating contractor application:", error);
    return NextResponse.json(
      { error: "Failed to submit application" },
      { status: 500 }
    );
  }
}
