create table public.pacientes (
  id uuid primary key default gen_random_uuid(),
  nome text not null check (btrim(nome) <> ''),
  email text,
  telefone text,
  created_at timestamptz not null default now()
);

create table public.medicos (
  id uuid primary key default gen_random_uuid(),
  nome text not null check (btrim(nome) <> ''),
  crm text not null unique check (btrim(crm) <> ''),
  especialidade text not null check (btrim(especialidade) <> ''),
  email text,
  telefone text,
  created_at timestamptz not null default now()
);

create table public.consultas (
  id uuid primary key default gen_random_uuid(),
  paciente_id uuid not null references public.pacientes (id) on delete restrict,
  medico_id uuid not null references public.medicos (id) on delete restrict,
  data_hora timestamptz not null,
  status text not null default 'agendada'
    check (status in ('agendada', 'confirmada', 'aguardando', 'concluida', 'cancelada')),
  created_at timestamptz not null default now()
);

create index consultas_paciente_id_idx on public.consultas (paciente_id);
create index consultas_medico_id_idx on public.consultas (medico_id);
create index consultas_data_hora_idx on public.consultas (data_hora);

alter table public.pacientes enable row level security;
alter table public.medicos enable row level security;
alter table public.consultas enable row level security;

revoke all on public.pacientes, public.medicos, public.consultas from public, anon;
grant select, insert, update, delete on public.pacientes, public.medicos, public.consultas to authenticated;

create policy "clinic staff can manage patients"
  on public.pacientes
  for all
  to authenticated
  using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'clinic_staff')
  with check ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'clinic_staff');

create policy "clinic staff can manage doctors"
  on public.medicos
  for all
  to authenticated
  using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'clinic_staff')
  with check ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'clinic_staff');

create policy "clinic staff can manage appointments"
  on public.consultas
  for all
  to authenticated
  using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'clinic_staff')
  with check ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'clinic_staff');