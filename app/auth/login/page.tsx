"use client";

import { useState } from "react";
import { login } from "@/services/authService";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const res = await login({ email, password });
    setLoading(false);

    if (res.error) {
      setMessage(res.error);
    } else {
      setMessage("Login berhasil!");
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md  backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8">

        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-white-700 mb-2 tracking-wide">
          Selamat Datang
        </h1>
        <p className="text-center text-gray-100 mb-6">
          Masuk ke akun kamu untuk melanjutkan
        </p>

        {/* FORM */}
        <form onSubmit={handleLogin} className="space-y-4 text-gray-200">
          <div>
            <label className="text-sm font-medium text-gray-100">Email</label>
            <input
              type="email"
              placeholder="Masukkan email"
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-100">Password</label>
            <input
              type="password"
              placeholder="Masukkan password"
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 rounded-lg text-blue-700 font-semibold transition 
              ${loading ? "bg-blue-400" : "bg-white hover:bg-gray-200 "}
            `}
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>

        {/* Register Link */}
        <p className="text-sm text-center mt-5 text-gray-100">
          Belum punya akun?{" "}
          <a href="/auth/register" className="text-blue-100 font-semibold hover:underline">
            Daftar sekarang
          </a>
        </p>
      </div>
    </div>
  );
}
