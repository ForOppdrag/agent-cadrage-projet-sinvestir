export type BriefSensitivityLevel =
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
  sensitivity_level: BriefSensitivityLevel;
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

export type SensitivityLevel = "faible" | "moyen" | "eleve";

export type PatrimoineInput = {
  name: string;
  email: string;
  age?: number;
  familySituation?: string;
  professionalStatus?: string;
  monthlyIncome?: string;
  monthlySavings?: string;
  estimatedAssets?: string;
  debts?: string;
  existingProducts?: string;
  mainObjective: string;
  investmentHorizon?: string;
  riskTolerance?: string;
  sensitiveTopic?: string;
  freeDescription: string;
};

export type PatrimoineAnalysis = {
  type_agent: "preanalyse_patrimoniale";
  profil_general: string;
  reformulation_objectif: string;
  categorie_besoin: string[];
  horizon: string;
  tolerance_risque_declaree: string;
  informations_manquantes: string[];
  points_attention: string[];
  documents_a_fournir: string[];
  questions_pour_conseiller: string[];
  niveau_sensibilite: SensitivityLevel;
  validation_humaine_requise: boolean;
  raison_validation: string;
  synthese_conseiller: string;
  prochaine_action: string;
};

export type PilotageInput = {
  period: string;
  billedRevenue?: number;
  overdueAmount?: number;
  invoiceCount?: number;
  overdueInvoiceCount?: number;
  invoiceData?: string;
  businessContext: string;
  alertThreshold?: string;
};

export type PilotageAnalysis = {
  type_agent: "pilotage_facturation_dashboard";
  periode_analysee: string;
  resume_executif: string;
  indicateurs: {
    ca_facture: number;
    montant_en_retard: number;
    nombre_factures_en_retard: number;
    nombre_anomalies: number;
  };
  anomalies_detectees: string[];
  factures_prioritaires: string[];
  risques_operationnels: string[];
  emails_relance_a_preparer: string[];
  validation_humaine_requise: boolean;
  raison_validation: string;
  actions_recommandees: string[];
  message_dashboard: string;
  prochaine_action: string;
};
