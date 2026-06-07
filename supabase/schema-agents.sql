create extension if not exists "pgcrypto";

create table if not exists patrimoine_analyses (
  id uuid primary key default gen_random_uuid(),
  requester_name text,
  requester_email text,
  raw_payload jsonb,
  analysis jsonb,
  sensitivity_level text,
  human_validation_required boolean default true,
  status text default 'pending_human_review',
  created_at timestamptz default now()
);

create table if not exists pilotage_analyses (
  id uuid primary key default gen_random_uuid(),
  period text,
  raw_payload jsonb,
  analysis jsonb,
  anomaly_count integer,
  human_validation_required boolean default true,
  status text default 'pending_human_review',
  created_at timestamptz default now()
);

create table if not exists invoice_demo_data (
  id uuid primary key default gen_random_uuid(),
  client_name text,
  invoice_number text,
  amount numeric,
  due_date date,
  status text,
  created_at timestamptz default now()
);

create index if not exists patrimoine_analyses_created_at_idx on patrimoine_analyses(created_at desc);
create index if not exists patrimoine_analyses_requester_email_idx on patrimoine_analyses(requester_email);
create index if not exists patrimoine_analyses_status_idx on patrimoine_analyses(status);

create index if not exists pilotage_analyses_created_at_idx on pilotage_analyses(created_at desc);
create index if not exists pilotage_analyses_period_idx on pilotage_analyses(period);
create index if not exists pilotage_analyses_status_idx on pilotage_analyses(status);

create index if not exists invoice_demo_data_created_at_idx on invoice_demo_data(created_at desc);
create index if not exists invoice_demo_data_status_idx on invoice_demo_data(status);
