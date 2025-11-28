"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import app from "@/libs/firebase"; 

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const auth = getAuth(app);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Service", href: "/pelaporan" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link href="/" className="flex text-2xl font-bold gap-2 items-center">
          <p className="text-orange-500">Teman</p>
          <p className="text-blue-500">Malang</p>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-700 hover:text-blue-500 transition"
            >
              {link.name}
            </Link>
          ))}

          {/* Login / Profile */}
          {user ? (
            <Link
              href="/profile"
              className="text-blue-600 font-semibold hover:text-blue-800"
            >
              Profile
            </Link>
          ) : (
            <Link
              href="/auth/login"
              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {open && (
        <div className="md:hidden bg-white shadow-md px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block text-gray-700 hover:text-blue-500 transition"
            >
              {link.name}
            </Link>
          ))}

          {/* Login / Profile Mobile */}
          {user ? (
            <Link
              href="/profile"
              onClick={() => setOpen(false)}
              className="block text-blue-600 font-semibold"
            >
              Profile
            </Link>
          ) : (
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="block bg-orange-500 text-white px-4 py-2 rounded-lg text-center"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
