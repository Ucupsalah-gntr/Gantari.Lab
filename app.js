const NAV = {
  admin: [
    ["dashboard","⌂","Dasbor"],
    ["siswa","◉","Data Siswa"],
    ["spp","Rp","Monitoring SPP"],
    ["absensi","✓","Rekap Absensi"]
  ],
  guru: [
    ["dashboard","⌂","Dasbor"],
    ["input-absensi","✓","Input Absensi"],
    ["riwayat","↺","Riwayat Absensi"],
    ["perkembangan","★","Perkembangan Anak"]
  ],
  ortu: [
    ["dashboard","⌂","Ringkasan Anak"],
    ["kehadiran","✓","Kehadiran Anak"],
    ["status-spp","Rp","Status SPP"],
    ["perkembangan","★","Perkembangan Anak"]
  ]
};

const ROLE_META = {
  admin: {name:"Muhammad Fajar", role:"Administrator"},
  guru: {name:"Ibu Rina", role:"Guru Kelas 3A"},
  ortu: {name:"Bapak Yusuf", role:"Orang Tua · Maryam"}
};

const LAB = window.GantariLabData || {
  list: () => [],
  findById: () => null
};

function buildLabData(){
  const users = LAB.list("pengguna");
  const classes = LAB.list("kelas");
  const students = LAB.list("siswa");

  return {
    users,
    classes,
    students,
    adminStats: [
      ["Total Siswa", String(students.length), "data dummy aktif", ""],
      ["SPP Lunas", "3", "dari 4 siswa dummy", "good"],
      ["Belum Lunas", "1", "perlu ditindaklanjuti", "bad"],
      ["Absensi Hari Ini", "2/4", "50% hadir di seed", "accent"]
    ],
    guruStats: [
      ["Siswa Kelas", "2", "Kelas 3A", ""],
      ["Hadir", "1", "50% hari ini", "good"],
      ["Izin / Sakit", "1", "tercatat hari ini", "warn"],
      ["Catatan Baru", "2", "contoh untuk pengujian UI", "accent"]
    ],
    ortuStats: [
      ["Kehadiran", "100%", "contoh Maryam", "good"],
      ["SPP", "Lunas", "September 2026", ""],
      ["Perkembangan", "88", "rata-rata dummy", "accent"],
      ["Catatan Guru", "2", "contoh catatan", "warn"]
    ]
  };
}

const LAB_DATA = buildLabData();

const DATA = {
  admin: {
    title:"Dasbor",
    subtitle:"Ringkasan operasional sekolah dalam satu layar.",
    hero:"Selamat datang di Gantari.Lab",
    heroText:"Sandbox gratis untuk menguji UI/UX dan alur fitur Gantariku. Data diambil dari mock database, bukan database produksi.",
    stats:LAB_DATA.adminStats
  },
  guru: {
    title:"Dasbor Guru",
    subtitle:"Akses cepat untuk absensi dan perkembangan anak.",
    hero:"Pagi, Ibu Rina 👋",
    heroText:"Hari ini fokus pada absensi kelas dan catatan perkembangan. Semua aksi utama dibuat mudah dijangkau dari layar kecil maupun besar.",
    stats:LAB_DATA.guruStats
  },
  ortu: {
    title:"Ringkasan Anak",
    subtitle:"Informasi utama anak ditampilkan tanpa perlu banyak berpindah halaman.",
    hero:"Halo, Bapak Yusuf 👋",
    heroText:"Berikut ringkasan kondisi Maryam dari data dummy Gantari.Lab.",
    stats:LAB_DATA.ortuStats
  }
};
  admin: {
    title:"Dasbor",
    subtitle:"Ringkasan operasional sekolah dalam satu layar.",
    hero:"Selamat datang di Gantari.Lab",
    heroText:"Di sini kita menguji fondasi UI/UX sebelum menyentuh Gantariku utama. Layout sengaja dibuat ringan, konsisten, dan responsif.",
    stats:[
      ["Total Siswa","42","terdaftar",""],
      ["SPP Lunas","36","85,7%","good"],
      ["Belum Lunas","6","perlu ditindaklanjuti","bad"],
      ["Absensi Hari Ini","39/42","92,9% hadir","accent"]
    ]
  },
  guru: {
    title:"Dasbor Guru",
    subtitle:"Akses cepat untuk absensi dan perkembangan anak.",
    hero:"Pagi, Ibu Rina 👋",
    heroText:"Hari ini fokus pada absensi kelas dan catatan perkembangan. Semua aksi utama dibuat mudah dijangkau dari layar kecil maupun besar.",
    stats:[
      ["Siswa Kelas","28","Kelas 3A",""],
      ["Hadir","26","92,9%","good"],
      ["Izin / Sakit","2","tercatat hari ini","warn"],
      ["Catatan Baru","5","belum dibaca wali","accent"]
    ]
  },
  ortu: {
    title:"Ringkasan Anak",
    subtitle:"Informasi utama anak ditampilkan tanpa perlu banyak berpindah halaman.",
    hero:"Halo, Bapak Yusuf 👋",
    heroText:"Berikut ringkasan kondisi Maryam hari ini: kehadiran, SPP, dan perkembangan anak.",
    stats:[
      ["Kehadiran","96,2%","semester berjalan","good"],
      ["SPP","Lunas","September 2026",""],
      ["Perkembangan","88","rata-rata terakhir","accent"],
      ["Catatan Guru","2","catatan terbaru","warn"]
    ]
  }
};

let state = {
  role: "admin",
  page: "dashboard"
};

const $ = (selector) => document.querySelector(selector);

function esc(value){
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[char]));
}

function renderNav(){
  const nav = $("#nav");
  nav.innerHTML = NAV[state.role].map(([key,icon,label]) =>
    `<button type="button" class="${state.page === key ? "active":""}" data-page="${key}">
      <span class="nav-icon">${icon}</span><span>${label}</span>
    </button>`
  ).join("");

  nav.querySelectorAll("[data-page]").forEach((button) => {
    button.addEventListener("click", () => {
      state.page = button.dataset.page;
      render();
      closeMobileMenu();
    });
  });
}

function renderRole(){
  $("#userName").textContent = ROLE_META[state.role].name;
  $("#userRole").textContent = ROLE_META[state.role].role;

  document.querySelectorAll("#roleSwitch button").forEach((button) => {
    button.classList.toggle("active", button.dataset.role === state.role);
  });
}

function renderStats(stats){
  return `<div class="stats">${stats.map(([label,value,foot,tone]) => `
    <article class="stat ${esc(tone)}">
      <div class="stat-label">${esc(label)}</div>
      <div class="stat-value">${esc(value)}</div>
      <div class="stat-foot">${esc(foot)}</div>
    </article>
  `).join("")}</div>`;
}

function commonTestBanner(){
  return `<div class="test-banner">
    <div class="test-badge">✦</div>
    <div>
      <strong>Mode Lab aktif</strong>
      <p>Halaman ini adalah playground. Data masih dummy dan tersimpan lokal di data/mock-db.js; belum ada koneksi ke Supabase.</p>
    </div>
  </div>`;
}

function dashboardPage(){
  const meta = DATA[state.role];
  const lists = state.role === "admin"
    ? [
      ["Ananda Aisyah","Kelas 1A · SPP September","Lunas","good"],
      ["Ananda Rafi","Kelas 2B · SPP September","Belum Lunas","bad"],
      ["Ananda Zahra","Kelas 3A · Absensi","Izin","warn"]
    ]
    : state.role === "guru"
    ? [
      ["08:00 · Absensi","Kelas 3A · 28 siswa","Selesai","good"],
      ["10:00 · Catatan","5 perkembangan baru","Perlu ditinjau","warn"],
      ["13:00 · Ringkasan","1 siswa perlu perhatian","Info","neutral"]
    ]
    : [
      ["Kehadiran","Hari ini · hadir","Hadir","good"],
      ["SPP September","Pembayaran diterima","Lunas","good"],
      ["Catatan Guru","2 pembaruan","Baru","warn"]
    ];

  return `
    ${commonTestBanner()}
    <section class="hero">
      <div class="hero-copy">
        <h2>${esc(meta.hero)}</h2>
        <p>${esc(meta.heroText)}</p>
      </div>
      <div class="hero-mark" aria-hidden="true">🌻</div>
    </section>
    ${renderStats(meta.stats)}
    <div class="grid-2">
      <section class="card">
        <div class="card-head">
          <div><h3>Aktivitas Ringkas</h3><p>Contoh komponen yang membaca data mock tanpa database berbayar.</p></div>
          <button class="button secondary" type="button">Lihat semua</button>
        </div>
        <div class="card-body">
          <div class="list">${lists.map(([title,sub,badge,tone]) => `
            <div class="list-item">
              <div class="list-main"><div class="list-title">${esc(title)}</div><div class="list-sub">${esc(sub)}</div></div>
              <span class="badge ${esc(tone)}">${esc(badge)}</span>
            </div>
          `).join("")}</div>
        </div>
      </section>

      <section class="card">
        <div class="card-head">
          <div><h3>Checklist Fondasi</h3><p>Target utama sebelum fitur dipindahkan.</p></div>
        </div>
        <div class="card-body">
          <div class="list">
            <div class="list-item"><div class="list-main"><div class="list-title">Layout desktop</div><div class="list-sub">Sidebar, topbar, card, tabel</div></div><span class="badge good">Siap</span></div>
            <div class="list-item"><div class="list-main"><div class="list-title">Layout mobile</div><div class="list-sub">Sidebar dropdown, no horizontal leak</div></div><span class="badge good">Siap</span></div>
            <div class="list-item"><div class="list-main"><div class="list-title">Role preview</div><div class="list-sub">Admin · Guru · Ortu</div></div><span class="badge good">Siap</span></div>
            <div class="list-item"><div class="list-main"><div class="list-title">Supabase</div><div class="list-sub">Schema + seed dummy</div></div><span class="badge warn">Berikutnya</span></div>
          </div>
        </div>
      </section>
    </div>
  `;
}

function genericPage(){
  const labels = {
    siswa:["Data Siswa","Kelola daftar siswa tanpa tabel yang mudah rusak di mobile."],
    spp:["Monitoring SPP","Pantau status pembayaran dengan filter sederhana."],
    absensi:["Rekap Absensi","Ringkasan kehadiran yang tetap nyaman dibaca di HP."],
    "input-absensi":["Input Absensi","Form absensi guru dengan target sentuh yang cukup besar."],
    riwayat:["Riwayat Absensi","Riwayat kelas ditampilkan sebagai tabel desktop dan kartu mobile."],
    perkembangan:["Perkembangan Anak","Penilaian dan catatan perkembangan dengan hierarchy yang lebih ringan."],
    kehadiran:["Kehadiran Anak","Riwayat kehadiran anak untuk wali murid."],
    "status-spp":["Status SPP","Status pembayaran anak dengan informasi yang langsung terbaca."]
  };
  const [title,subtitle] = labels[state.page] || ["Halaman","Preview halaman"];
  return `
    ${commonTestBanner()}
    <section class="card">
      <div class="card-head">
        <div><h3>${esc(title)}</h3><p>${esc(subtitle)}</p></div>
        <button class="button secondary" type="button">Tambah</button>
      </div>
      <div class="card-body">
        <div class="toolbar">
          <input class="field" type="search" placeholder="Cari data dummy..." aria-label="Cari">
          <select class="field" aria-label="Filter"><option>Semua</option><option>Aktif</option><option>Perlu perhatian</option></select>
          <button class="button" type="button">Terapkan</button>
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Nama</th><th>Kelas</th><th>Status</th><th>Terakhir diperbarui</th></tr></thead>
            <tbody>
              <tr><td><strong>Maryam Sophia</strong></td><td>3A</td><td><span class="badge good">Aktif</span></td><td>26 Sep 2026</td></tr>
              <tr><td><strong>Rafi Pratama</strong></td><td>3A</td><td><span class="badge warn">Perlu perhatian</span></td><td>25 Sep 2026</td></tr>
              <tr><td><strong>Zahra Aulia</strong></td><td>2B</td><td><span class="badge good">Aktif</span></td><td>25 Sep 2026</td></tr>
              <tr><td><strong>Aisyah Nabila</strong></td><td>1A</td><td><span class="badge neutral">Arsip</span></td><td>20 Sep 2026</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  `;
}

function render(){
  const meta = DATA[state.role];
  $("#pageTitle").textContent = state.page === "dashboard" ? meta.title : (NAV[state.role].find(([key]) => key === state.page)?.[2] || meta.title);
  $("#pageSubtitle").textContent = state.page === "dashboard" ? meta.subtitle : "Preview komponen dan interaksi sebelum dihubungkan ke data nyata.";
  $("#content").innerHTML = state.page === "dashboard" ? dashboardPage() : genericPage();
  renderRole();
  renderNav();
}

function openMobileMenu(){
  $("#sidebar").classList.add("open");
  $("#backdrop").classList.add("show");
}
function closeMobileMenu(){
  $("#sidebar").classList.remove("open");
  $("#backdrop").classList.remove("show");
}

$("#roleSwitch").addEventListener("click", (event) => {
  const button = event.target.closest("[data-role]");
  if (!button) return;
  state.role = button.dataset.role;
  state.page = "dashboard";
  render();
});
$("#openMenu").addEventListener("click", openMobileMenu);
$("#closeMenu").addEventListener("click", closeMobileMenu);
$("#backdrop").addEventListener("click", closeMobileMenu);

render();
