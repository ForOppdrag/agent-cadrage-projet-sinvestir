type AnalysisResultCardProps = {
  title: string;
  message: string;
  tone?: "info" | "success" | "warning" | "error";
};

export function AnalysisResultCard({
  title,
  message,
  tone = "info"
}: AnalysisResultCardProps) {
  return (
    <aside className={`notice notice-${tone}`}>
      <h2>{title}</h2>
      <p>{message}</p>
    </aside>
  );
}
