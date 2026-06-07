type DashboardPreviewProps = {
  billedRevenue?: string;
  overdueAmount?: string;
  invoiceCount?: string;
  overdueInvoiceCount?: string;
};

export function DashboardPreview({
  billedRevenue,
  overdueAmount,
  invoiceCount,
  overdueInvoiceCount
}: DashboardPreviewProps) {
  const cards = [
    { label: "CA facture", value: billedRevenue || "0" },
    { label: "Montant en retard", value: overdueAmount || "0" },
    { label: "Factures", value: invoiceCount || "0" },
    { label: "Factures en retard", value: overdueInvoiceCount || "0" }
  ];

  return (
    <section className="dashboard-preview" aria-label="Apercu dashboard">
      {cards.map((card) => (
        <div className="metric" key={card.label}>
          <span>{card.label}</span>
          <strong>{card.value}</strong>
        </div>
      ))}
    </section>
  );
}
