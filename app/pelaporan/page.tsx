import Link from "next/link";

export default function ServicePage() {
  const steps = [
    {
      icon: "📸",
      text: "Jika teman menemukan teman tunawisma dan anak-anak terlantar, segera ambil foto dari jarak jauh dan lapor ke website Teman Malang.",
    },
    {
      icon: "🌐",
      text: "Akses website Teman Malang melalui browser di ponsel atau komputer. Di halaman utama, klik halaman “Service”.",
    },
    {
      icon: "📝",
      text: "Isi formulir laporan: unggah foto, deskripsi singkat, tentukan lokasi kejadian, jenis kasus, identitas pelapor (opsional), nomor telepon, dan submit laporan.",
    },
    {
      icon: "🔍",
      text: "Setelah submit laporan, teman akan mendapatkan nomor laporan. Simpan nomor tersebut untuk pengecekan status.",
    },
    {
      icon: "📄",
      text: "Klik halaman “Status”, lalu masukkan nomor laporan untuk melihat perkembangan laporan teman.",
    },
    {
      icon: "🏢",
      text: "Setelah laporan diverifikasi, laporan akan diteruskan ke dinas sosial, polresta Malang, LBH, dan Pemkot Malang sesuai kebutuhan kasus.",
    },
  ];

  return (
    <section className="min-h-screen flex items-center justify-center py-16 px-6 md:px-20">
      
      <div className="flex flex-col md:flex-row bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden max-w-6xl w-full p-6">

        {/* LEFT SIDE – Steps Cards */}
        <div className="md:w-1/2 flex flex-col gap-4 p-6">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start gap-2 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
              <div className="text-4xl text-orange-500">{step.icon}</div>
              <p className="text-gray-700 leading-relaxed">{step.text}</p>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE – Title & Image */}
        <div className="md:w-1/2 flex flex-col p-10 gap-6">
          <img
            src="/assets/pelaporan.webp"
            className="w-full rounded-xl shadow-lg"
            alt="Pelaporan"
          />

          {/* Title */}
          <h1 className="text-4xl font-extrabold text-blue-900 leading-tight">
            <span className="border-l-8 border-blue-800 pl-3">
              TATA CARA PELAPORAN
            </span>
            <br />
            <span className="text-orange-500">TEMAN MALANG</span>
          </h1>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link
              href="/pelaporan/lapor"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg shadow-md transition-all text-center"
            >
              Lapor Sekarang
            </Link>
            <Link
              href="/pelaporan/laporan-saya"
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg shadow-md transition-all text-center"
            >
              Laporan Saya
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
