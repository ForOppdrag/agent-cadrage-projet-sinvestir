export type SensitivityLevel =
  | "standard"
  | "confidentiel"
  | "financier"
  | "juridique"
  | "contractuel"
  | "rh";

export type PoleConcerned =
  | "direction"
  | "commercial"
  | "marketing"
  | "operations"
  | "patrimoine"
  | "finance"
  | "tech"
  | "autre";

export type BriefInput = {
  requester_name: string;
  requester_email: string;
  pole: PoleConcerned;
  urgency: string;
  raw_need: string;
  expected_goal: string;
  constraints?: string;
  desired_deadline?: string;
  tools_used?: string;
  sensitivity_level: SensitivityLevel;
};

export type ProjectSheet = {
  reformulation: string;
  objective: string;
  hypotheses: string[];
  clarification_questions: string[];
  mvp: {
    description: string;
    etapes: string[];
  };
  n8n_workflow: string[];
  required_data: string[];
  risks: string[];
  human_validation_required: boolean;
  validation_reason: string;
  acceptance_checklist: string[];
  next_action: string;
};
