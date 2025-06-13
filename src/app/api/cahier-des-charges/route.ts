import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    console.log("📩 Données reçues dans l'API :", JSON.stringify(reqBody, null, 2));

    const { data: inserted, error } = await supabase
      .from("cahier_des_charges")
      .insert([{ data: reqBody }]);

    if (error) {
      console.error("❌ Erreur Supabase :", JSON.stringify(error, null, 2));
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log("✅ Données insérées :", inserted);

    return NextResponse.json({ message: "Document sauvegardé", inserted });
  } catch (err: any) {
    console.error("💥 Erreur API :", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
