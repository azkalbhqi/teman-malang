import Image from "next/image";

export default function AboutPage() {
  return (
    <section className="min-h-screen flex items-center justify-center py-24 px-6 md:px-20">
      <div className="flex flex-col md:flex-row bg-white/80 rounded-2xl shadow-2xl overflow-hidden max-w-6xl w-full backdrop-blur-md">

        {/* Left Image */}
        <div className="md:w-1/2 relative">
          <Image
            src="/assets/hp.webp"
            alt="Teman Malang"
            className="w-full h-full object-cover"
            width={600}
            height={600}
          />
        </div>

        {/* Right Text */}
        <div className="md:w-1/2 p-10 flex flex-col justify-center gap-6">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 leading-tight">
            APA ITU <span className="text-orange-500">TEMAN MALANG?</span>
          </h1>

          <p className="text-gray-700 text-lg leading-relaxed text-justify">
            Teman Malang adalah platform digital yang membantu masyarakat Malang 
            melaporkan tunawisma, anak terlantar, atau individu rentan yang membutuhkan pertolongan. 
            Platform ini menjadi jembatan antara warga dan pemerintah, khususnya dinas sosial, 
            agar penanganan dapat dilakukan lebih cepat, tepat, dan terkoordinasi.
          </p>

          {/* Feature Highlight */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 flex items-center justify-center text-3xl bg-orange-100 text-orange-500 rounded-full shadow-md">
              📲
            </div>
            <div>
              <p className="font-semibold text-orange-600 text-lg">Satu Kali ‘Submit’ Sangat Berarti</p>
              <p className="text-gray-700 text-sm">Bagi Teman Kita</p>
            </div>
          </div>

          {/* Quote Box */}
          <div className="bg-blue-900 text-white p-6 rounded-xl shadow-lg border-l-4 border-orange-500">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 flex items-center justify-center rounded-full border border-white text-xl">
                👤
              </div>
              <p className="text-sm text-gray-200">Quote Inspiratif</p>
            </div>
            <p className="text-lg md:text-xl font-medium leading-relaxed">
              “Manusia menciptakan teknologi, teknologi membantu manusia”
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
