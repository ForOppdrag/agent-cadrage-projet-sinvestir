insert into invoice_demo_data (client_name, invoice_number, amount, due_date, status) values
  ('Alpha Conseil', 'INV-2026-001', 1200, '2026-06-10', 'paid'),
  ('Beta Media', 'INV-2026-002', 2450, '2026-05-15', 'overdue'),
  ('Gamma Patrimoine', 'INV-2026-003', 980, '2026-06-20', 'pending'),
  ('Delta Formation', 'INV-2026-004', 7800, '2026-05-30', 'overdue'),
  ('Beta Media', 'INV-2026-002-DUP', 2450, '2026-05-15', 'potential_duplicate'),
  ('Epsilon Invest', 'INV-2026-005', 18500, '2026-06-25', 'unusual_amount'),
  ('Zeta Conseil', 'INV-2026-006', 640, '2026-06-05', 'paid'),
  ('Client actif sans paiement recent', 'INV-2026-007', 0, '2026-04-30', 'missing_recent_payment'),
  ('Omega Advisory', 'INV-2026-008', 1320, '2026-05-28', 'overdue'),
  ('Sigma Services', 'INV-2026-009', 2100, '2026-06-18', 'pending');
