import type { PatrimoineInput } from "@/lib/types";
import { hasText, isValidEmail } from "@/lib/utils";

export function validatePatrimoineInput(input: PatrimoineInput) {
  const errors: string[] = [];

  if (!isValidEmail(input.email || "")) {
    errors.push("email");
  }

  if (!hasText(input.mainObjective)) {
    errors.push("mainObjective");
  }

  if (!hasText(input.freeDescription)) {
    errors.push("freeDescription");
  }

  return errors;
}

export function buildPatrimoinePayload(input: PatrimoineInput) {
  return {
    ...input,
    agent: "preanalyse_patrimoniale",
    human_validation_required: true,
    submitted_at: new Date().toISOString(),
    source: "nextjs-agent-patrimoine"
  };
}
