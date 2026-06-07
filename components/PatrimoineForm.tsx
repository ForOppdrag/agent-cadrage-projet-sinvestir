"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import type { PatrimoineInput } from "@/lib/types";
import { AnalysisResultCard } from "@/components/AnalysisResultCard";

const initialForm: PatrimoineInput = {
  name: "",
  email: "",
  age: undefined,
  familySituation: "",
  professionalStatus: "",
  monthlyIncome: "",
  monthlySavings: "",
  estimatedAssets: "",
  debts: "",
  existingProducts: "",
  mainObjective: "",
  investmentHorizon: "",
  riskTolerance: "",
  sensitiveTopic: "",
  freeDescription: ""
};

export function PatrimoineForm() {
  const [form, setForm] = useState<PatrimoineInput>(initialForm);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  function updateField<K extends keyof PatrimoineInput>(
    key: K,
    value: PatrimoineInput[K]
  ) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/patrimoine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "La demande n'a pas pu etre analysee.");
      }

      setStatus("success");
      setMessage(data.message || "Demande envoyee au conseiller.");
      setForm(initialForm);
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error ? error.message : "Une erreur est survenue."
      );
    }
  }

  return (
    <div className="agent-layout">
      <form className="brief-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <TextField
            id="name"
            label="Prenom ou nom"
            value={form.name}
            onChange={(value) => updateField("name", value)}
          />
          <TextField
            id="email"
            label="Email"
            type="email"
            value={form.email}
            onChange={(value) => updateField("email", value)}
            required
          />
          <TextField
            id="age"
            label="Age"
            type="number"
            value={form.age?.toString() || ""}
            onChange={(value) =>
              updateField("age", value ? Number(value) : undefined)
            }
          />
          <TextField
            id="familySituation"
            label="Situation familiale"
            value={form.familySituation || ""}
            onChange={(value) => updateField("familySituation", value)}
          />
          <TextField
            id="professionalStatus"
            label="Statut professionnel"
            value={form.professionalStatus || ""}
            onChange={(value) => updateField("professionalStatus", value)}
          />
          <TextField
            id="monthlyIncome"
            label="Revenus mensuels approximatifs"
            value={form.monthlyIncome || ""}
            onChange={(value) => updateField("monthlyIncome", value)}
          />
          <TextField
            id="monthlySavings"
            label="Capacite d'epargne mensuelle"
            value={form.monthlySavings || ""}
            onChange={(value) => updateField("monthlySavings", value)}
          />
          <TextField
            id="estimatedAssets"
            label="Patrimoine approximatif"
            value={form.estimatedAssets || ""}
            onChange={(value) => updateField("estimatedAssets", value)}
          />
        </div>

        <div className="form-grid">
          <TextField
            id="debts"
            label="Dettes ou credits"
            value={form.debts || ""}
            onChange={(value) => updateField("debts", value)}
          />
          <TextField
            id="existingProducts"
            label="Produits detenus"
            value={form.existingProducts || ""}
            onChange={(value) => updateField("existingProducts", value)}
          />
          <TextField
            id="mainObjective"
            label="Objectif principal"
            value={form.mainObjective}
            onChange={(value) => updateField("mainObjective", value)}
            required
          />
          <TextField
            id="investmentHorizon"
            label="Horizon d'investissement"
            value={form.investmentHorizon || ""}
            onChange={(value) => updateField("investmentHorizon", value)}
          />
          <TextField
            id="riskTolerance"
            label="Tolerance au risque"
            value={form.riskTolerance || ""}
            onChange={(value) => updateField("riskTolerance", value)}
          />
          <TextField
            id="sensitiveTopic"
            label="Sujet sensible eventuel"
            value={form.sensitiveTopic || ""}
            onChange={(value) => updateField("sensitiveTopic", value)}
          />
        </div>

        <div className="field">
          <label htmlFor="freeDescription">Description libre</label>
          <textarea
            id="freeDescription"
            className="control textarea-large"
            value={form.freeDescription}
            onChange={(event) =>
              updateField("freeDescription", event.target.value)
            }
            placeholder="Contexte, questions, contraintes, echeances, inquietudes."
            required
          />
        </div>

        <AnalysisResultCard
          title="Validation humaine obligatoire"
          message="Cette analyse est preparatoire et necessite une validation humaine."
          tone="warning"
        />

        <div className="form-actions">
          <button
            className="submit-button"
            disabled={status === "loading"}
            type="submit"
          >
            <Send size={18} aria-hidden="true" />
            {status === "loading" ? "Analyse en cours..." : "Pre-analyser"}
          </button>
          {message ? (
            <p
              className={
                status === "error"
                  ? "status-message status-error"
                  : "status-message status-success"
              }
            >
              {message}
            </p>
          ) : null}
        </div>
      </form>
    </div>
  );
}

type TextFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: string;
};

function TextField({
  id,
  label,
  value,
  onChange,
  required,
  type = "text"
}: TextFieldProps) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        className="control"
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
      />
    </div>
  );
}
