# Gantari.Lab

Sandbox dummy untuk pengembangan dan pengujian Gantariku tanpa menyentuh project utama.

## Mode saat ini

Gantari.Lab berjalan **tanpa Supabase** agar seluruh eksperimen tetap gratis. Data pengujian berada di `data/mock-db.js`.

Stack:
- GitHub — source code
- Vercel — preview/deployment
- Mock database lokal — data dummy dan simulasi alur

## Supabase

Folder `supabase/` berisi rancangan migration dan seed untuk fase integrasi database di kemudian hari. File tersebut **tidak membuat biaya apa pun** selama migration belum dijalankan pada project/branch Supabase.

Jangan memasukkan data produksi atau credential rahasia ke repository ini.

## Prinsip Lab

1. UI/UX diuji di sini terlebih dahulu.
2. Fitur dapat dirombak tanpa mengganggu Gantariku utama.
3. Setelah stabil, pola yang sudah terbukti aman dapat dipindahkan ke project utama.
