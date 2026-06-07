import { Header } from "@/components/Header";
import { PatrimoineForm } from "@/components/PatrimoineForm";
import { AnalysisResultCard } from "@/components/AnalysisResultCard";

export default function PatrimoinePage() {
  return (
    <main className="app-shell">
      <Header />
      <section className="page-section">
        <div className="intro">
          <p className="eyebrow">Agent patrimoine</p>
          <h1>Agent IA de pre-analyse patrimoniale</h1>
          <p>
            POC permettant de structurer une demande utilisateur avant passage a
            un conseiller humain.
          </p>
        </div>
        <AnalysisResultCard
          title="Conformite"
          message="Cet agent ne fournit pas de conseil financier personnalise automatique. Toute decision financiere, fiscale, juridique, patrimoniale ou contractuelle exige une validation humaine."
          tone="warning"
        />
        <PatrimoineForm />
      </section>
    </main>
  );
}
