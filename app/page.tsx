import { BriefForm } from "@/components/BriefForm";
import { Header } from "@/components/Header";

export default function Home() {
  return (
    <main className="app-shell">
      <Header />
      <section className="page-section">
        <div className="intro">
          <p className="eyebrow">POC S'investir</p>
          <h1>
            Agent IA de cadrage projet
          </h1>
          <p>
            Transformez un brief metier brut en fiche projet claire, challengee
            et exploitable par une equipe interne, avec une validation humaine
            lorsque le sujet est sensible.
          </p>
        </div>
        <BriefForm />
      </section>
    </main>
  );
}
