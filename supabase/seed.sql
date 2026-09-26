-- Gantari.Lab dummy data
insert into public.pengguna (id,nama,email,role)
values
 ('11111111-1111-4111-8111-111111111111','Muhammad Fajar','admin@gantarilab.test','admin'),
 ('22222222-2222-4222-8222-222222222222','Ibu Rina','guru@gantarilab.test','guru'),
 ('33333333-3333-4333-8333-333333333333','Bapak Yusuf','ortu@gantarilab.test','ortu')
on conflict (id) do nothing;

insert into public.kelas (id,nama,tahun_ajaran,wali_guru_id)
values
 ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa','1A','2026/2027','22222222-2222-4222-8222-222222222222'),
 ('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb','2B','2026/2027',null),
 ('cccccccc-cccc-4ccc-8ccc-cccccccccccc','3A','2026/2027','22222222-2222-4222-8222-222222222222')
on conflict (id) do nothing;

insert into public.siswa (id,nama,nis,kelas_id,tahun_ajaran,orang_tua_id,kode_akses)
values
 ('00000001-0001-4001-8001-000000000001','Maryam Sophia','GTL-0001','cccccccc-cccc-4ccc-8ccc-cccccccccccc','2026/2027','33333333-3333-4333-8333-333333333333','MARYAM01'),
 ('00000001-0001-4001-8001-000000000002','Rafi Pratama','GTL-0002','cccccccc-cccc-4ccc-8ccc-cccccccccccc','2026/2027',null,'RAFI02'),
 ('00000001-0001-4001-8001-000000000003','Zahra Aulia','GTL-0003','bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb','2026/2027',null,'ZAHRA03'),
 ('00000001-0001-4001-8001-000000000004','Aisyah Nabila','GTL-0004','aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa','2026/2027',null,'AISYAH04')
on conflict (id) do nothing;

insert into public.absensi (siswa_id,tanggal,status,catatan,created_by)
values
 ('00000001-0001-4001-8001-000000000001',current_date,'hadir',null,'22222222-2222-4222-8222-222222222222'),
 ('00000001-0001-4001-8001-000000000002',current_date,'izin','Acara keluarga','22222222-2222-4222-8222-222222222222'),
 ('00000001-0001-4001-8001-000000000003',current_date,'hadir',null,'22222222-2222-4222-8222-222222222222'),
 ('00000001-0001-4001-8001-000000000004',current_date,'sakit','Demam','22222222-2222-4222-8222-222222222222')
on conflict (siswa_id,tanggal) do nothing;

insert into public.spp (siswa_id,bulan,tahun,nominal,status,dibayar_pada)
values
 ('00000001-0001-4001-8001-000000000001',9,2026,150000,'lunas',current_date),
 ('00000001-0001-4001-8001-000000000002',9,2026,150000,'belum_lunas',null),
 ('00000001-0001-4001-8001-000000000003',9,2026,150000,'lunas',current_date),
 ('00000001-0001-4001-8001-000000000004',9,2026,150000,'lunas',current_date)
on conflict (siswa_id,bulan,tahun) do nothing;
