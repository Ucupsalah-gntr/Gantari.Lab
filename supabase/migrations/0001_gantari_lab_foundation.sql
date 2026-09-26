-- Gantari.Lab foundation
-- Dummy schema for UI/feature testing. No production data.

create extension if not exists pgcrypto;

create table if not exists public.pengguna (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique,
  nama text not null,
  email text,
  role text not null check (role in ('admin','guru','ortu')),
  created_at timestamptz not null default now()
);

create table if not exists public.kelas (
  id uuid primary key default gen_random_uuid(),
  nama text not null unique,
  tahun_ajaran text not null default '2026/2027',
  wali_guru_id uuid references public.pengguna(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.siswa (
  id uuid primary key default gen_random_uuid(),
  nama text not null,
  nis text not null unique,
  kelas_id uuid references public.kelas(id) on delete set null,
  tahun_ajaran text not null default '2026/2027',
  orang_tua_id uuid references public.pengguna(id) on delete set null,
  kode_akses text unique,
  created_at timestamptz not null default now()
);

create table if not exists public.absensi (
  id uuid primary key default gen_random_uuid(),
  siswa_id uuid not null references public.siswa(id) on delete cascade,
  tanggal date not null,
  status text not null check (status in ('hadir','izin','sakit','alpa')),
  catatan text,
  created_by uuid references public.pengguna(id) on delete set null,
  created_at timestamptz not null default now(),
  unique (siswa_id, tanggal)
);

create table if not exists public.spp (
  id uuid primary key default gen_random_uuid(),
  siswa_id uuid not null references public.siswa(id) on delete cascade,
  bulan smallint not null check (bulan between 1 and 12),
  tahun smallint not null check (tahun between 2020 and 2100),
  nominal integer not null default 0 check (nominal >= 0),
  status text not null check (status in ('lunas','belum_lunas','sebagian')) default 'belum_lunas',
  dibayar_pada date,
  created_at timestamptz not null default now(),
  unique (siswa_id, bulan, tahun)
);

alter table public.pengguna enable row level security;
alter table public.kelas enable row level security;
alter table public.siswa enable row level security;
alter table public.absensi enable row level security;
alter table public.spp enable row level security;

-- Lab policies are intentionally simple for the first UI phase.
-- Tight production RLS will be added after the role/data flow is finalized.

create policy "lab authenticated read pengguna"
  on public.pengguna for select to authenticated using (true);

create policy "lab authenticated read kelas"
  on public.kelas for select to authenticated using (true);

create policy "lab authenticated read siswa"
  on public.siswa for select to authenticated using (true);

create policy "lab authenticated read absensi"
  on public.absensi for select to authenticated using (true);

create policy "lab authenticated read spp"
  on public.spp for select to authenticated using (true);
