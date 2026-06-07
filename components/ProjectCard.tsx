import type { ProjectSheet } from "@/lib/types";

type ProjectCardProps = {
  project: ProjectSheet;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="project-card">
      <h2>{project.objective}</h2>
      <p>{project.reformulation}</p>
      <p className="muted">
        Validation humaine :{" "}
        {project.human_validation_required ? "requise" : "non requise"}
      </p>
    </article>
  );
}
