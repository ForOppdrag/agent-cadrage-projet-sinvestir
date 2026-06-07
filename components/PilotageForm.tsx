"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { AnalysisResultCard } from "@/components/AnalysisResultCard";
import { DashboardPreview } from "@/components/DashboardPreview";
import type { PilotageInput } from "@/lib/types";

const initialForm: PilotageInput = {
  period: "",
  billedRevenue: undefined,
  overdueAmount: undefined,
  invoiceCount: undefined,
  overdueInvoiceCount: undefined,
  invoiceData: "",
  businessContext: "",
  alertThreshold: ""
};

export function PilotageForm() {
  const [form, setForm] = useState<PilotageInput>(initialForm);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  function updateField<K extends keyof PilotageInput>(
    key: K,
    value: PilotageInput[K]
  ) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function toOptionalNumber(value: string) {
    return value ? Number(value) : undefined;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/pilotage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "L'analyse n'a pas pu etre lancee.");
      }

      setStatus("success");
      setMessage(data.message || "Analyse transmise au workflow n8n.");
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
            id="period"
            label="Periode analysee"
            value={form.period}
            onChange={(value) => updateField("period", value)}
            required
          />
          <TextField
            id="billedRevenue"
            label="Chiffre d'affaires facture"
            type="number"
            value={form.billedRevenue?.toString() || ""}
            onChange={(value) => updateField("billedRevenue", toOptionalNumber(value))}
          />
          <TextField
            id="overdueAmount"
            label="Montant en retard"
            type="number"
            value={form.overdueAmount?.toString() || ""}
            onChange={(value) => updateField("overdueAmount", toOptionalNumber(value))}
          />
          <TextField
            id="invoiceCount"
            label="Nombre de factures"
            type="number"
            value={form.invoiceCount?.toString() || ""}
            onChange={(value) => updateField("invoiceCount", toOptionalNumber(value))}
          />
          <TextField
            id="overdueInvoiceCount"
            label="Nombre de factures en retard"
            type="number"
            value={form.overdueInvoiceCount?.toString() || ""}
            onChange={(value) =>
              updateField("overdueInvoiceCount", toOptionalNumber(value))
            }
          />
          <TextField
            id="alertThreshold"
            label="Seuil d'alerte"
            value={form.alertThreshold || ""}
            onChange={(value) => updateField("alertThreshold", value)}
          />
        </div>

        <DashboardPreview
          billedRevenue={form.billedRevenue?.toString()}
          overdueAmount={form.overdueAmount?.toString()}
          invoiceCount={form.invoiceCount?.toString()}
          overdueInvoiceCount={form.overdueInvoiceCount?.toString()}
        />

        <div className="field">
          <label htmlFor="invoiceData">Donnees factures texte ou JSON</label>
          <textarea
            id="invoiceData"
            className="control textarea-large"
            value={form.invoiceData || ""}
            onChange={(event) => updateField("invoiceData", event.target.value)}
            placeholder="Liste de factures, statuts, dates d'echeance, montants, clients."
          />
        </div>

        <div className="field">
          <label htmlFor="businessContext">Contexte business</label>
          <textarea
            id="businessContext"
            className="control textarea-medium"
            value={form.businessContext}
            onChange={(event) =>
              updateField("businessContext", event.target.value)
            }
            required
          />
        </div>

        <AnalysisResultCard
          title="Synthese de pilotage"
          message="L'agent produit une synthese operationnelle, pas une decision comptable ou contractuelle definitive."
          tone="info"
        />

        <div className="form-actions">
          <button
            className="submit-button"
            disabled={status === "loading"}
            type="submit"
          >
            <Send size={18} aria-hidden="true" />
            {status === "loading" ? "Analyse en cours..." : "Analyser"}
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
