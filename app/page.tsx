import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen py-27 text-white relative overflow-hidden font-sans ">

    
      {/* Container */}
      <div className="container mx-auto md:px-20 relative z-10 text-center md:text-left bg-blue-400/30 rounded-2xl py-27 px-8 shadow-lg backdrop-blur-md flex">

        {/* Center Content */}
        <div className="max-w-4xl mx-auto md:mx-0 flex flex-col items-center md:items-start">

          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4">
            <span className="text-white">TEMAN</span>{" "}
            <span className="text-orange-500">MALANG</span>
          </h1>

          {/* Sub Quote */}
          <p className="mt-2 text-lg md:text-xl text-orange-300 font-medium italic">
            “Bersama Menjaga Sesama karena Semua Layak Diperhatikan”
          </p>

          {/* Description */}
          <p className="mt-6 text-gray-200 leading-relaxed text-justify">
            Lahir dari penglihatan, perasaan, dan pikiran yang tumbuh setiap kali kita 
            melihat seseorang di sudut jalan menunggu uluran tangan, merasakan keresahan 
            ketika anak-anak harus bertahan tanpa perlindungan, dan memikirkan bagaimana 
            langkah kecil dapat membawa perubahan besar. Teman Malang hadir sebagai wujud 
            kepedulian bersama, tempat di mana warga Malang bisa berperan aktif melaporkan 
            mereka yang membutuhkan bantuan, sekaligus menghubungkan perhatian masyarakat 
            dengan aksi nyata dari pihak yang berwenang.
          </p>

          {/* Buttons */}
          <div className="flex justify-center md:justify-start gap-4 mt-8">

            <Link href="/about" className="px-6 py-3 border border-gray-200 text-white rounded-lg flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300 transition transform hover:scale-105 shadow-lg">
              NEXT <span>⟶</span>
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
}
