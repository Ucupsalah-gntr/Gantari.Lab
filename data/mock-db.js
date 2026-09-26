// Gantari.Lab — local mock database
// Shape mengikuti tabel utama Gantariku, tetapi seluruh data bersifat dummy.

window.GANTARI_LAB_MODE = true;

window.GANTARI_LAB_DB = {
  pengguna: [
    {id:"u-admin", user_id:"auth-admin", nama:"Muhammad Fajar", email:"admin@gantarilab.test", role:"admin", nomor_hp:null, alamat:null},
    {id:"u-guru", user_id:"auth-guru", nama:"Ibu Rina", email:"guru@gantarilab.test", role:"guru", nomor_hp:null, alamat:null},
    {id:"u-ortu", user_id:"auth-ortu", nama:"Bapak Yusuf", email:"ortu@gantarilab.test", role:"ortu", nomor_hp:null, alamat:null}
  ],
  siswa: [
    {id:"s-001", nama:"Maryam Sophia", nis:"GTL-0001", kelas:"3A", tahun_ajaran:"2026/2027", orang_tua_id:"u-ortu", tanggal_lahir:null, jenis_kelamin:"P", alamat:null, nomor_hp_ortu:null, kode_akses:"GTR-MARYAM01"},
    {id:"s-002", nama:"Rafi Pratama", nis:"GTL-0002", kelas:"3A", tahun_ajaran:"2026/2027", orang_tua_id:null, tanggal_lahir:null, jenis_kelamin:"L", alamat:null, nomor_hp_ortu:null, kode_akses:"GTR-RAFI0002"},
    {id:"s-003", nama:"Zahra Aulia", nis:"GTL-0003", kelas:"2B", tahun_ajaran:"2026/2027", orang_tua_id:null, tanggal_lahir:null, jenis_kelamin:"P", alamat:null, nomor_hp_ortu:null, kode_akses:"GTR-ZAHRA03"},
    {id:"s-004", nama:"Aisyah Nabila", nis:"GTL-0004", kelas:"1A", tahun_ajaran:"2026/2027", orang_tua_id:null, tanggal_lahir:null, jenis_kelamin:"P", alamat:null, nomor_hp_ortu:null, kode_akses:"GTR-AISYAH4"}
  ],
  absensi: [
    {id:"a-001", siswa_id:"s-001", tanggal:"2026-09-26", status:"H", keterangan:"", input_oleh:"u-guru"},
    {id:"a-002", siswa_id:"s-002", tanggal:"2026-09-26", status:"I", keterangan:"Acara keluarga", input_oleh:"u-guru"},
    {id:"a-003", siswa_id:"s-003", tanggal:"2026-09-26", status:"H", keterangan:"", input_oleh:"u-guru"},
    {id:"a-004", siswa_id:"s-004", tanggal:"2026-09-26", status:"S", keterangan:"Demam", input_oleh:"u-guru"},
    {id:"a-005", siswa_id:"s-001", tanggal:"2026-09-25", status:"H", keterangan:"", input_oleh:"u-guru"},
    {id:"a-006", siswa_id:"s-002", tanggal:"2026-09-25", status:"H", keterangan:"", input_oleh:"u-guru"}
  ],
  spp: [
    {id:"p-001", siswa_id:"s-001", bulan:9, tahun:2026, nominal:150000, status:"Lunas", tanggal_bayar:"2026-09-05", bukti_bayar_url:null, dicatat_oleh:"u-admin", catatan:null, keterangan_pembayaran:null, metode_pembayaran:"transfer"},
    {id:"p-002", siswa_id:"s-002", bulan:9, tahun:2026, nominal:150000, status:"Belum Bayar", tanggal_bayar:null, bukti_bayar_url:null, dicatat_oleh:null, catatan:null, keterangan_pembayaran:null, metode_pembayaran:null},
    {id:"p-003", siswa_id:"s-003", bulan:9, tahun:2026, nominal:150000, status:"Lunas", tanggal_bayar:"2026-09-06", bukti_bayar_url:null, dicatat_oleh:"u-admin", catatan:null, keterangan_pembayaran:null, metode_pembayaran:"cash"},
    {id:"p-004", siswa_id:"s-004", bulan:9, tahun:2026, nominal:150000, status:"Lunas", tanggal_bayar:"2026-09-07", bukti_bayar_url:null, dicatat_oleh:"u-admin", catatan:null, keterangan_pembayaran:null, metode_pembayaran:"transfer"}
  ],
  perkembangan: [
    {id:"pk-001", siswa_id:"s-001", guru_id:"u-guru", tanggal:"2026-09-20", aspek:"Percaya Diri", nilai:5, catatan:"Berani presentasi di depan kelas."},
    {id:"pk-002", siswa_id:"s-001", guru_id:"u-guru", tanggal:"2026-09-20", aspek:"Kedisiplinan", nilai:4, catatan:"Konsisten mengikuti jadwal."},
    {id:"pk-003", siswa_id:"s-002", guru_id:"u-guru", tanggal:"2026-09-21", aspek:"Membaca", nilai:4, catatan:"Perlu sedikit dorongan saat membaca."},
    {id:"pk-004", siswa_id:"s-003", guru_id:"u-guru", tanggal:"2026-09-22", aspek:"Keaktifan", nilai:5, catatan:"Aktif dan konsisten."},
    {id:"pk-005", siswa_id:"s-004", guru_id:"u-guru", tanggal:"2026-09-23", aspek:"Kerja Sama", nilai:4, catatan:"Kerja sama semakin baik."}
  ],
  absensi_guru: [
    {id:"ag-001", guru_id:"u-guru", tanggal:"2026-09-26", status:"H", keterangan:"Hadir"}
  ],
  orang_tua_siswa: [
    {id:"ots-001", orang_tua_id:"u-ortu", siswa_id:"s-001"}
  ]
};

window.GantariLabData = {
  list(table) {
    return structuredClone(Array.isArray(window.GANTARI_LAB_DB[table]) ? window.GANTARI_LAB_DB[table] : []);
  },
  findById(table,id) {
    return this.list(table).find(row => String(row.id) === String(id)) ?? null;
  }
};
