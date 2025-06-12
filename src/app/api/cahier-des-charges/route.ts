// app/api/cahier-des-charges/route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const data = await req.json();

  const { data: inserted, error } = await supabase
    .from("cahier_des_charges")
    .insert([data]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Document sauvegardé", inserted });
}
