"use client";

import { useEffect, useState } from "react";
import { db } from "@/libs/firebase";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  doc,
} from "firebase/firestore";
import Link from "next/link";
import {
  FaRegClock,
  FaHourglassHalf,
  FaCheckCircle,
} from "react-icons/fa";

interface Laporan {
  id: string;
  imageUrl: string;
  deskripsi: string;
  lokasi: string;
  jenisKasus: string;
  namaPelapor: string;
  noTelpPelapor: string;
  emailPelapor: string;
  status: string;
  createdAt?: { seconds: number; nanoseconds: number };
}

export default function AdminLaporanPage() {
  const [laporan, setLaporan] = useState<Laporan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "laporan"), orderBy("createdAt", "desc"));

    const unsub = onSnapshot(q, (snapshot) => {
      const data: Laporan[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Laporan[];
      setLaporan(data);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const statusOptions = [
    "terkirim",
    "diterima",
    "diperiksa",
    "verified",
    "diteruskan",
    "ditangani",
    "selesai",
  ];

  const renderIcon = (status: string) => {
    if (status === "terkirim") return <FaRegClock className="text-blue-500" />;
    if (status === "diterima") return <FaHourglassHalf className="text-blue-500" />;
    if (status === "diperiksa") return <FaHourglassHalf className="text-orange-500" />;
    if (status === "verified") return <FaHourglassHalf className="text-green-500" />;
    if (status === "diteruskan") return <FaHourglassHalf className="text-green-500" />;
    if (status === "ditangani") return <FaHourglassHalf className="text-green-500" />;
    if (status === "selesai") return <FaCheckCircle className="text-gray-600" />;
    return null;
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    const ref = doc(db, "laporan", id);
    await updateDoc(ref, { status: newStatus });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-lg">
        Mengambil data laporan...
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-blue-50">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        Dashboard Admin - Data Laporan
      </h1>

      {laporan.length === 0 ? (
        <p className="text-center text-gray-600 mt-10">
          Belum ada laporan yang masuk.
        </p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-5">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="p-3 text-left">Foto</th>
                <th className="p-3 text-left">Pelapor</th>
                <th className="p-3 text-left">Jenis Kasus</th>
                <th className="p-3 text-left">Deskripsi</th>
                <th className="p-3 text-left">Lokasi</th>
                <th className="p-3 text-left">Tanggal</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {laporan.map((item) => (
                <tr
                  key={item.id}
                  className="border-b hover:bg-gray-100 transition"
                >
                  <td className="p-3">
                    <img
                      src={item.imageUrl}
                      alt="img"
                      className="w-20 h-20 object-cover rounded-lg shadow"
                    />
                  </td>

                  <td className="p-3">
                    <p className="font-semibold text-gray-900">{item.namaPelapor}</p>

                    <Link
                      href={`https://wa.me/62${item.noTelpPelapor}`}
                      target="_blank"
                      className="hover:underline"
                    >
                      <p className="text-gray-900 text-xs">0{item.noTelpPelapor}</p>
                    </Link>

                    <p className="text-gray-900 text-xs">{item.emailPelapor}</p>
                  </td>

                  <td className="p-3">
                    <span className="px-3 py-1 rounded-full text-white bg-orange-500 text-xs">
                      {item.jenisKasus}
                    </span>
                  </td>

                  <td className="p-3 max-w-xs truncate text-gray-900">
                    {item.deskripsi}
                  </td>

                  <td className="p-3 text-gray-900">{item.lokasi}</td>

                  <td className="p-3 text-gray-900 text-sm">
                    {item.createdAt
                      ? new Date(item.createdAt.seconds * 1000).toLocaleString("id-ID")
                      : "-"}
                  </td>

                  {/* STATUS + DROPDOWN */}
                  <td className="p-3 flex items-center gap-2">
                    {renderIcon(item.status)}

                    <select
                      value={item.status}
                      onChange={(e) => handleStatusChange(item.id, e.target.value)}
                      className="p-2 border rounded-lg bg-white text-gray-950 shadow-sm text-sm"
                    >
                      {statusOptions.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
