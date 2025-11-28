"use client";

import { useEffect, useState } from "react";
import { db, auth } from "@/libs/firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { FaCheckCircle, FaHourglassHalf, FaRegClock, FaCopy } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface Laporan {
  uuid: string;        // doc.id sebagai UUID
  imageUrl: string;
  deskripsi: string;
  lokasi: string;
  jenisKasus: string;
  status: string;
  emailPelapor: string;
  createdAt?: { seconds: number };
}

export default function LaporanSayaPage() {
  const [laporan, setLaporan] = useState<Laporan[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const router = useRouter();
  

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        alert("Silakan login terlebih dahulu.");
        router.push("/auth/login");
        return;
      }

      try {
        const q = query(
          collection(db, "laporan"),
          where("emailPelapor", "==", user.email),
          orderBy("createdAt", "desc")
        );

        const snap = await getDocs(q);
        const data = snap.docs.map((doc) => ({
          uuid: doc.id,
          ...doc.data(),
        })) as Laporan[];

        setLaporan(data);
      } catch (error) {
        console.error("Error fetching laporan:", error);
      }

      setLoading(false);
    });

    return () => unsub();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-lg">
        Memuat laporan Anda...
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    if (status === "terkirim") return <FaRegClock className="text-blue-500" />;
    if (status === "diterima") return <FaHourglassHalf className="text-blue-500" />;
    if (status === "diperiksa") return <FaHourglassHalf className="text-orange-500" />;
    if (status === "verified") return <FaHourglassHalf className="text-green-500" />;
    if (status === "diteruskan") return <FaHourglassHalf className="text-green-500" />;
    if (status === "ditangani") return <FaHourglassHalf className="text-green-500" />;
    if (status === "selesai") return <FaCheckCircle className="text-gray-600" />;
    return <FaCheckCircle className="text-green-600" />;
  };

  const handleCopy = (uuid: string) => {
    navigator.clipboard.writeText(uuid);
    alert(`UUID ${uuid} disalin ke clipboard`);
  };

  const filteredLaporan = laporan.filter((l) =>
    l.uuid.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen p-6 bg-linear-to-b from-slate-100 to-slate-200">
      <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center md:text-left">
        Laporan Saya
      </h1>

      {/* Search */}
<div className="mb-6 flex justify-center md:justify-start">
  <div className="relative w-full md:w-1/2">
    {/* Icon */}
    <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
      🔍
    </span>

    {/* Input */}
    <input
      type="text"
      placeholder="Cari berdasarkan UUID..."
      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 shadow-sm 
                 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 
                 placeholder-gray-400 transition"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />

    {/* Clear button */}
    {search && (
      <button
        onClick={() => setSearch("")}
        className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
      >
        ✖
      </button>
    )}
  </div>
</div>


      {filteredLaporan.length === 0 ? (
        <p className="text-gray-600 text-center">Belum ada laporan yang sesuai.</p>
      ) : (
        <ul className="grid gap-6 md:grid-cols-2">
          {filteredLaporan.map((item) => (
            <li
              key={item.uuid}
              className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl hover:shadow-2xl transition p-4 flex flex-col md:flex-row gap-4"
            >
              {/* IMAGE */}
              <div className="flex-shrink-0">
                <img
                  src={item.imageUrl}
                  alt="Foto Kejadian"
                  className="w-full md:w-32 h-32 object-cover rounded-xl border border-gray-200 shadow-sm"
                />
              </div>

              {/* CONTENT */}
              <div className="flex flex-col justify-between flex-1 gap-2">
                <div>
                  <h2 className="text-lg font-bold text-orange-500">{item.jenisKasus}</h2>
                  <p className="text-gray-700 text-sm">
                    <span className="font-semibold">Lokasi:</span> {item.lokasi}
                  </p>
                  <p className="text-gray-600 text-sm line-clamp-3">{item.deskripsi}</p>
                  {/* UUID */}
                  <div className="mt-2 flex items-center gap-2 text-xs text-gray-500 font-mono">
                    UUID: {item.uuid}
                    <button
                      type="button"
                      onClick={() => handleCopy(item.uuid)}
                      className="p-1 rounded hover:bg-gray-200 transition"
                    >
                      <FaCopy className="text-gray-400" />
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-2">
                  <span className="flex items-center gap-1 text-sm font-medium text-gray-950">
                    {getStatusIcon(item.status)}
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                  <span className="text-xs text-gray-500">
                    {item.createdAt
                      ? new Date(item.createdAt.seconds * 1000).toLocaleString("id-ID")
                      : "-"}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
