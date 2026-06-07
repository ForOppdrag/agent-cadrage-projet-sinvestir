create extension if not exists "pgcrypto";

create table if not exists briefs (
  id uuid primary key default gen_random_uuid(),
  requester_name text not null,
  requester_email text not null,
  pole text not null,
  urgency text not null,
  raw_need text not null,
  expected_goal text not null,
  constraints text,
  desired_deadline date,
  tools_used text,
  sensitivity_level text not null,
  status text not null default 'submitted',
  created_at timestamptz not null default now()
);

create table if not exists project_sheets (
  id uuid primary key default gen_random_uuid(),
  brief_id uuid not null references briefs(id) on delete cascade,
  reformulation text not null,
  objective text not null,
  hypotheses jsonb not null default '[]'::jsonb,
  clarification_questions jsonb not null default '[]'::jsonb,
  mvp jsonb not null default '{}'::jsonb,
  n8n_workflow jsonb not null default '[]'::jsonb,
  required_data jsonb not null default '[]'::jsonb,
  risks jsonb not null default '[]'::jsonb,
  human_validation_required boolean not null default true,
  validation_reason text,
  acceptance_checklist jsonb not null default '[]'::jsonb,
  next_action text,
  created_at timestamptz not null default now()
);

create table if not exists audit_logs (
  id uuid primary key default gen_random_uuid(),
  brief_id uuid references briefs(id) on delete set null,
  event_type text not null,
  event_payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists briefs_created_at_idx on briefs(created_at desc);
create index if not exists project_sheets_brief_id_idx on project_sheets(brief_id);
create index if not exists audit_logs_brief_id_idx on audit_logs(brief_id);
