import Link from "next/link";

export default function ContactPage() {
    const nohp = "6285650843216"; 
    const email = "temanmalangadm@gmail.com";
  return (
    <section className="min-h-screen bg-linear-to-bl from-blue-950/30 to-blue-900/40 text-white flex items-center justify-center px-6 py-20">
      <div className="max-w-3xl w-full text-center bg-white/10 backdrop-blur-xl rounded-2xl p-10 border border-white/20 shadow-xl">

        {/* TITLE */}
        <h1 className="text-4xl sm:text-5xl font-bold mb-2 tracking-wide flex justify-center gap-1">
          <span className="text-white">TEMAN</span>
          <span className="text-orange-500">MALANG</span>
        </h1>

        <p className="italic text-orange-300 mb-8">
          “Bersama Menjaga Sesama karena Semua Layak Diperhatikan”
        </p>

        {/* DESCRIPTION */}
        <p className="text-gray-200 mb-10 leading-relaxed text-lg">
          Jika teman mengalami masalah, kendala, atau terdapat hal yang ingin dikonfirmasi,
          teman dapat menghubungi kontak berikut:
        </p>

        {/* CONTACT CARD */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-xl space-y-6">

          {/* WhatsApp */}
          <Link
            href={`https://wa.me/${nohp}`}
            target="_blank"
            className="flex items-center gap-4 bg-white/5 hover:bg-white/10 transition-all p-4 rounded-xl cursor-pointer"
          >
            <div className="bg-green-500 w-12 h-12 rounded-full flex items-center justify-center shadow-md">
              <span className="text-white text-xl">📱</span>
            </div>
            <div className="text-left">
                <Link href={`https://wa.me/${nohp}`} target="_blank">
                    <p className="text-lg font-semibold">WhatsApp</p>
                    <p className="text-gray-300">+{nohp}</p>
                </Link>
            </div>
          </Link>

          {/* Email / Website */}
          <Link
            href={`mailto:${email}`}
            className="flex items-center gap-4 bg-white/5 hover:bg-white/10 transition-all p-4 rounded-xl cursor-pointer"
          >
            <div className="bg-gray-700 p-2 rounded-full flex items-center justify-center shadow-md">
              <span className="text-white text-xl">✉️</span>
            </div>
            <div className="text-left overflow-scroll sm:overflow-hidden">
              <p className="text-lg font-semibold">Email</p>
              <p className="text-gray-300">{email}</p>
            </div>
          </Link>
        </div>

        {/* BUTTONS */}
        <div className="flex justify-center mt-10 gap-4">
          <Link href="/pelaporan" className="flex items-center gap-2 px-6 py-2 border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition rounded-md">
            ⬅ Previous
          </Link>

          <Link href="/profile" className="flex items-center gap-2 px-6 py-2 border-2 border-white hover:bg-white hover:text-blue-900 transition rounded-md">
            Next ➡
          </Link>
        </div>
      </div>
    </section>
  );
}
