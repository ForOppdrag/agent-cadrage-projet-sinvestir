import { NextResponse } from "next/server";
import {
  buildPatrimoinePayload,
  validatePatrimoineInput
} from "@/lib/agents/patrimoine";
import type { PatrimoineInput } from "@/lib/types";

export async function POST(request: Request) {
  const webhookUrl = process.env.N8N_PATRIMOINE_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json(
      { error: "Le webhook patrimoine n'est pas configure." },
      { status: 500 }
    );
  }

  let body: PatrimoineInput;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Body JSON invalide." }, { status: 400 });
  }

  const errors = validatePatrimoineInput(body);

  if (errors.length > 0) {
    return NextResponse.json(
      { error: `Champs obligatoires invalides : ${errors.join(", ")}` },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(buildPatrimoinePayload(body))
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Le workflow n8n patrimoine a refuse la demande." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      message: "Demande transmise au conseiller via le workflow patrimoine.",
      status: "submitted"
    });
  } catch {
    return NextResponse.json(
      { error: "Impossible de contacter le webhook patrimoine." },
      { status: 502 }
    );
  }
}
