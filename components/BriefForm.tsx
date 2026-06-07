"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import type { BriefInput, PoleConcerned, SensitivityLevel } from "@/lib/types";

const initialForm: BriefInput = {
  requester_name: "",
  requester_email: "",
  pole: "operations",
  urgency: "normale",
  raw_need: "",
  expected_goal: "",
  constraints: "",
  desired_deadline: "",
  tools_used: "",
  sensitivity_level: "standard"
};

export function BriefForm() {
  const [form, setForm] = useState<BriefInput>(initialForm);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  function updateField<K extends keyof BriefInput>(key: K, value: BriefInput[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/submit-brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Le brief n'a pas pu etre envoye.");
      }

      setStatus("success");
      setMessage(data.message || "Brief envoye au workflow n8n.");
      setForm(initialForm);
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Une erreur inattendue est survenue."
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="brief-form"
    >
      <div className="form-grid">
        <div className="field">
          <label htmlFor="requester_name">Nom du demandeur</label>
          <input
            id="requester_name"
            className="control"
            value={form.requester_name}
            onChange={(event) => updateField("requester_name", event.target.value)}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="requester_email">Email</label>
          <input
            id="requester_email"
            className="control"
            type="email"
            value={form.requester_email}
            onChange={(event) => updateField("requester_email", event.target.value)}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="pole">Pole concerne</label>
          <select
            id="pole"
            className="control"
            value={form.pole}
            onChange={(event) =>
              updateField("pole", event.target.value as PoleConcerned)
            }
          >
            <option value="direction">Direction</option>
            <option value="commercial">Commercial</option>
            <option value="marketing">Marketing</option>
            <option value="operations">Operations</option>
            <option value="patrimoine">Patrimoine</option>
            <option value="finance">Finance</option>
            <option value="tech">Tech</option>
            <option value="autre">Autre</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor="urgency">Urgence</label>
          <select
            id="urgency"
            className="control"
            value={form.urgency}
            onChange={(event) => updateField("urgency", event.target.value)}
          >
            <option value="faible">Faible</option>
            <option value="normale">Normale</option>
            <option value="elevee">Elevee</option>
            <option value="critique">Critique</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor="desired_deadline">Echeance souhaitee</label>
          <input
            id="desired_deadline"
            className="control"
            type="date"
            value={form.desired_deadline}
            onChange={(event) =>
              updateField("desired_deadline", event.target.value)
            }
          />
        </div>

        <div className="field">
          <label htmlFor="sensitivity_level">Niveau de sensibilite</label>
          <select
            id="sensitivity_level"
            className="control"
            value={form.sensitivity_level}
            onChange={(event) =>
              updateField("sensitivity_level", event.target.value as SensitivityLevel)
            }
          >
            <option value="standard">Standard</option>
            <option value="confidentiel">Confidentiel</option>
            <option value="financier">Financier</option>
            <option value="juridique">Juridique</option>
            <option value="contractuel">Contractuel</option>
            <option value="rh">RH</option>
          </select>
        </div>
      </div>

      <div className="field">
        <label htmlFor="raw_need">Description brute du besoin</label>
          <textarea
            id="raw_need"
          className="control textarea-large"
          value={form.raw_need}
          onChange={(event) => updateField("raw_need", event.target.value)}
          placeholder="Decrivez le besoin tel qu'il a ete exprime par le metier."
          required
        />
      </div>

      <div className="form-grid">
        <div className="field">
          <label htmlFor="expected_goal">Objectif attendu</label>
          <textarea
            id="expected_goal"
            className="control textarea-medium"
            value={form.expected_goal}
            onChange={(event) => updateField("expected_goal", event.target.value)}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="constraints">Contraintes connues</label>
          <textarea
            id="constraints"
            className="control textarea-medium"
            value={form.constraints}
            onChange={(event) => updateField("constraints", event.target.value)}
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="tools_used">Outils utilises</label>
        <input
          id="tools_used"
          className="control"
          value={form.tools_used}
          onChange={(event) => updateField("tools_used", event.target.value)}
          placeholder="Exemples : HubSpot, WooCommerce, Google Sheets, Slack"
        />
      </div>

      <div className="form-actions">
        <button
          type="submit"
          disabled={status === "loading"}
          className="submit-button"
        >
          <Send size={18} aria-hidden="true" />
          {status === "loading" ? "Analyse en cours..." : "Analyser le brief"}
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
  );
}
