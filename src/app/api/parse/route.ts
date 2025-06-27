import { NextResponse } from "next/server";
import { criteriaSchema } from "./schema";

export async function POST(request: Request) {
  const body = await request.json();
  const validated = criteriaSchema.parse(body);
  return NextResponse.json({ success: true, data: validated });
}
