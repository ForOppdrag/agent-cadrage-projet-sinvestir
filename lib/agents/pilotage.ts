import type { PilotageInput } from "@/lib/types";
import { hasText } from "@/lib/utils";

export function validatePilotageInput(input: PilotageInput) {
  const errors: string[] = [];

  if (!hasText(input.period)) {
    errors.push("period");
  }

  if (!hasText(input.invoiceData) && !hasText(input.businessContext)) {
    errors.push("invoiceData_or_businessContext");
  }

  return errors;
}

export function buildPilotagePayload(input: PilotageInput) {
  return {
    ...input,
    agent: "pilotage_facturation_dashboard",
    human_validation_required: true,
    submitted_at: new Date().toISOString(),
    source: "nextjs-agent-pilotage"
  };
}
