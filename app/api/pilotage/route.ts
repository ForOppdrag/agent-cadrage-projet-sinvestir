import { NextResponse } from "next/server";
import {
  buildPilotagePayload,
  validatePilotageInput
} from "@/lib/agents/pilotage";
import type { PilotageInput } from "@/lib/types";

export async function POST(request: Request) {
  const webhookUrl = process.env.N8N_PILOTAGE_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json(
      { error: "Le webhook pilotage n'est pas configure." },
      { status: 500 }
    );
  }

  let body: PilotageInput;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Body JSON invalide." }, { status: 400 });
  }

  const errors = validatePilotageInput(body);

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
      body: JSON.stringify(buildPilotagePayload(body))
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Le workflow n8n pilotage a refuse la demande." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      message: "Analyse transmise au workflow de pilotage interne.",
      status: "submitted"
    });
  } catch {
    return NextResponse.json(
      { error: "Impossible de contacter le webhook pilotage." },
      { status: 502 }
    );
  }
}
