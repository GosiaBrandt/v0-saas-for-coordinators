import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("cases")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const body = await request.json();

  const { data, error } = await supabase
    .from("cases")
    .insert({
      title: body.title,
      description: body.description,
      type: body.type,
      status: body.status || "new",
      priority: body.priority || "normal",
      coordinator_id: body.coordinator_id,
      coordinator_name: body.coordinator_name,
      related_person_name: body.related_person_name,
      related_person_phone: body.related_person_phone,
      operational_note: body.operational_note,
      due_date: body.due_date,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
