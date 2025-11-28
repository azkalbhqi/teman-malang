"use client";

import { useForm } from "@/app/hooks/useForm";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/libs/firebase";



export default function LaporPage() {
    const [authLoading, setAuthLoading] = useState(true);
    const router = useRouter();
    
  const {
    form,
    setForm,
    loading,
    message,
    checkingUser,
    handleImageChange,
    handleSubmit,
  } = useForm();

   useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/auth/login"); // ⬅️ Redirect kalau belum login
      }
      setAuthLoading(false);
    });
    return () => unsub();
  }, [router]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-gray-600">Memeriksa sesi login...</p>
      </div>
    );
  }

  if (checkingUser) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Memeriksa akun...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-start py-24 px-4">
      <div className="bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl p-8 max-w-lg w-full">
        <h1 className="text-2xl font-bold text-blue-900 mb-6 text-center">
          Form Laporan Teman Malang
        </h1>

        {message && (
          <p
            className={`mb-4 text-center font-medium ${
              message.includes("berhasil") ? "text-green-600" : "text-orange-500"
            }`}
          >
            {message}
          </p>
        )}

        {(!form.namaPelapor || !form.noTelpPelapor) && (
          <p className="text-sm text-red-500 text-center mb-4">
            *Profil belum lengkap. Silakan isi nama & nomor telepon.
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-gray-700">
          <div>
            <label className="font-semibold">Foto Kejadian</label>
            <input
              type="file"
              accept="image/*"
              className="mt-2 w-full p-2 border rounded-lg"
              onChange={handleImageChange}
              required
            />
          </div>

          {form.imageBase64 && (
            <img
              src={form.imageBase64}
              alt="preview"
              className="rounded-xl mt-3 shadow-md border border-gray-200"
            />
          )}

          <textarea
            placeholder="Deskripsi kejadian"
            className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-orange-300 transition"
            value={form.deskripsi}
            onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
            required
          />

          <input
            type="text"
            placeholder="Lokasi Kejadian"
            className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-orange-300 transition"
            value={form.lokasi}
            onChange={(e) => setForm({ ...form, lokasi: e.target.value })}
            required
          />

          <select
            className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-orange-300 transition"
            value={form.jenisKasus}
            onChange={(e) => setForm({ ...form, jenisKasus: e.target.value })}
          >
            <option value="Tunawisma">Tunawisma</option>
            <option value="Anak Jalanan">Anak Jalanan</option>
            <option value="Darurat">Darurat</option>
          </select>

          <button
            type="submit"
            disabled={loading || !form.namaPelapor || !form.noTelpPelapor}
            className={`w-full p-3 rounded-lg text-white font-semibold shadow-md transition transform hover:scale-105 ${
              form.namaPelapor && form.noTelpPelapor
                ? "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-500"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {loading ? "Mengirim..." : "Kirim Laporan"}
          </button>
        </form>
      </div>
    </div>
  );
}
