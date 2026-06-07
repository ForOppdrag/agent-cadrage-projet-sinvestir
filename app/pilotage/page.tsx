import { Header } from "@/components/Header";
import { PilotageForm } from "@/components/PilotageForm";
import { AnalysisResultCard } from "@/components/AnalysisResultCard";

export default function PilotagePage() {
  return (
    <main className="app-shell">
      <Header />
      <section className="page-section">
        <div className="intro">
          <p className="eyebrow">Agent operations</p>
          <h1>Agent IA de pilotage interne</h1>
          <p>
            POC permettant d'analyser la facturation, les anomalies et les
            priorites du dashboard.
          </p>
        </div>
        <AnalysisResultCard
          title="Validation requise"
          message="Les relances, arbitrages financiers et decisions contractuelles necessitent une validation humaine."
          tone="warning"
        />
        <PilotageForm />
      </section>
    </main>
  );
}
