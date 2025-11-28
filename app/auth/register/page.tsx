"use client";

import { register } from "@/services/authService";
import { useState } from "react";

export default function RegisterPage() {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [notelp, setNotelp] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleRegister = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const res = await register({ nama, email, notelp, password });
    setLoading(false);

    if (res.error) setMessage(res.error);
    else setMessage("Registrasi berhasil! Silakan login.");
  };

  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <div
        className="w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8 text-white"
      >
        <h1 className="text-3xl font-bold text-center mb-2">
          Buat Akun Baru
        </h1>
        <p className="text-center text-white/80 mb-6">
          Daftar untuk mulai menggunakan aplikasi
        </p>

        {message && (
          <p className="mb-4 text-center text-sm bg-white/20 py-2 rounded-lg">
            {message}
          </p>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="text-sm ml-1">Nama Lengkap</label>
            <input
              type="text"
              placeholder="Nama Anda"
              className="w-full p-3 mt-1 rounded-xl bg-white/20 border border-white/30 placeholder-white/60 text-white focus:ring-2 focus:ring-white/50 outline-none"
              onChange={(e) => setNama(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm ml-1">Email</label>
            <input
              type="email"
              placeholder="email@example.com"
              className="w-full p-3 mt-1 rounded-xl bg-white/20 border border-white/30 placeholder-white/60 text-white focus:ring-2 focus:ring-white/50 outline-none"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm ml-1">Nomor Telepon</label>
            <div className="flex items-center gap-2">
            <p>+62</p>
            <input
              type="text"
              placeholder="8xxxxxxxx"
              className="w-full p-3 mt-1 rounded-xl bg-white/20 border border-white/30 placeholder-white/60 text-white focus:ring-2 focus:ring-white/50 outline-none"
              onChange={(e) => setNotelp(e.target.value)}
              required
            />
            </div>
          </div>

          <div>
            <label className="text-sm ml-1">Password</label>
            <input
              type="password"
              placeholder="Minimal 6 karakter"
              className="w-full p-3 mt-1 rounded-xl bg-white/20 border border-white/30 placeholder-white/60 text-white focus:ring-2 focus:ring-white/50 outline-none"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
           
            type="submit"
            disabled={loading}
            className="w-full p-3 mt-4 bg-white text-orange-600 font-bold rounded-xl shadow-md hover:bg-gray-100 transition"
          >
            {loading ? "Memproses..." : "Daftar"}
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-white/80">
          Sudah punya akun?{" "}
          <a
            href="/auth/login"
            className="text-white font-semibold underline underline-offset-4"
          >
            Login sekarang
          </a>
        </p>
      </div>
    </div>
  );
}
