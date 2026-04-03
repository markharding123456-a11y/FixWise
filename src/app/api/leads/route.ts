import { NextRequest, NextResponse } from "next/server";
import { createLead } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.name || !body.issue_description) {
      return NextResponse.json(
        { error: "Name and issue description are required" },
        { status: 400 }
      );
    }

    const lead = createLead({
      name: body.name,
      email: body.email || null,
      phone: body.phone || null,
      city: body.city || null,
      province_state: body.province_state || null,
      issue_description: body.issue_description,
      preferred_contact: body.preferred_contact || "email",
    });

    return NextResponse.json({ success: true, lead });
  } catch (error) {
    console.error("Error creating lead:", error);
    return NextResponse.json(
      { error: "Failed to submit request" },
      { status: 500 }
    );
  }
}
