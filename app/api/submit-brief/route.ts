import { NextResponse } from "next/server";
import type { BriefInput } from "@/lib/types";
import { hasText, isValidEmail } from "@/lib/utils";

const requiredFields: Array<keyof BriefInput> = [
  "requester_name",
  "requester_email",
  "pole",
  "urgency",
  "raw_need",
  "expected_goal",
  "sensitivity_level"
];

export async function POST(request: Request) {
  const webhookUrl = process.env.N8N_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json(
      { error: "La variable N8N_WEBHOOK_URL n'est pas configuree." },
      { status: 500 }
    );
  }

  let body: BriefInput;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Le body JSON est invalide." },
      { status: 400 }
    );
  }

  const missingFields = requiredFields.filter((field) => !hasText(body[field]));

  if (missingFields.length > 0) {
    return NextResponse.json(
      { error: `Champs obligatoires manquants : ${missingFields.join(", ")}` },
      { status: 400 }
    );
  }

  if (!isValidEmail(body.requester_email)) {
    return NextResponse.json(
      { error: "L'adresse email du demandeur est invalide." },
      { status: 400 }
    );
  }

  const payload = {
    ...body,
    submitted_at: new Date().toISOString(),
    source: "nextjs-agent-cadrage-projet"
  };

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Le webhook n8n a refuse le brief." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      message: "Brief envoye au workflow n8n.",
      status: "submitted"
    });
  } catch {
    return NextResponse.json(
      { error: "Impossible de contacter le webhook n8n." },
      { status: 502 }
    );
  }
}
