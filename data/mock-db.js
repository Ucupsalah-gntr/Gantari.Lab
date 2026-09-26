// Gantari.Lab — free local mock data.
// This file replaces a real database during UI/UX testing.
// Do not put production credentials or personal data here.

window.GANTARI_LAB_DB = {
  pengguna: [
    { id:"u-admin", nama:"Muhammad Fajar", role:"admin" },
    { id:"u-guru", nama:"Ibu Rina", role:"guru" },
    { id:"u-ortu", nama:"Bapak Yusuf", role:"ortu" }
  ],
  kelas: [
    { id:"k-1a", nama:"1A", tahun_ajaran:"2026/2027" },
    { id:"k-2b", nama:"2B", tahun_ajaran:"2026/2027" },
    { id:"k-3a", nama:"3A", tahun_ajaran:"2026/2027" }
  ],
  siswa: [
    { id:"s-001", nama:"Maryam Sophia", nis:"GTL-0001", kelas_id:"k-3a", orang_tua_id:"u-ortu", kode_akses:"MARYAM01" },
    { id:"s-002", nama:"Rafi Pratama", nis:"GTL-0002", kelas_id:"k-3a", orang_tua_id:null, kode_akses:"RAFI02" },
    { id:"s-003", nama:"Zahra Aulia", nis:"GTL-0003", kelas_id:"k-2b", orang_tua_id:null, kode_akses:"ZAHRA03" },
    { id:"s-004", nama:"Aisyah Nabila", nis:"GTL-0004", kelas_id:"k-1a", orang_tua_id:null, kode_akses:"AISYAH04" }
  ]
};

// Adapter sederhana untuk pengembangan fitur.
// Nanti koneksi ke Supabase dapat mengganti fungsi ini tanpa mengubah UI.
window.GantariLabData = {
  list(table) {
    return Array.isArray(window.GANTARI_LAB_DB?.[table])
      ? structuredClone(window.GANTARI_LAB_DB[table])
      : [];
  },
  findById(table, id) {
    return this.list(table).find(row => row.id === id) ?? null;
  }
};
