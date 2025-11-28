"use client";

import { useEffect, useState } from "react";
import { db, auth } from "@/libs/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

interface FormState {
  imageBase64: string;
  deskripsi: string;
  lokasi: string;
  jenisKasus: string;
  namaPelapor: string;
  noTelpPelapor: string;
  emailPelapor: string;
}

export function useForm() {
  const [form, setForm] = useState<FormState>({
    imageBase64: "",
    deskripsi: "",
    lokasi: "",
    jenisKasus: "Tunawisma",
    namaPelapor: "",
    noTelpPelapor: "",
    emailPelapor: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [checkingUser, setCheckingUser] = useState(true);

  // ============================
  // Fetch user info
  // ============================
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (!user) {
          setCheckingUser(false);
          alert("Silakan login terlebih dahulu untuk melapor.");
          return;
        }

        const q = query(collection(db, "users"), where("email", "==", user.email));
        const snap = await getDocs(q);

        if (!snap.empty) {
          const data = snap.docs[0].data();
          setForm((prev) => ({
            ...prev,
            namaPelapor: data.nama || "",
            noTelpPelapor: data.notelp || "",
            emailPelapor: data.email || "",
          }));
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        setMessage("Terjadi kesalahan saat mengambil data pelapor.");
      }
      setCheckingUser(false);
    });

    return () => unsubscribe();
  }, []);

  // ============================
  // Handle image
  // ============================
  const handleImageChange = (e: any) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;

      if (file.size > 1024 * 1024) {
        setMessage("Ukuran foto maksimal 1 MB!");
        setForm((prev) => ({ ...prev, imageBase64: "" }));
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        if (base64.length > 900000) {
          setMessage("Foto terlalu besar, kompres dulu.");
          setForm((prev) => ({ ...prev, imageBase64: "" }));
          return;
        }
        setForm((prev) => ({ ...prev, imageBase64: base64 }));
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error(err);
      setMessage("Gagal memproses gambar.");
    }
  };

  // ============================
  // Handle form submit
  // ============================
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!form.namaPelapor || !form.noTelpPelapor) {
      setMessage("Profil belum lengkap. Mohon isi nama & nomor telepon.");
      return;
    }

    if (form.imageBase64.length > 900000) {
      setMessage("Foto terlalu besar untuk dikirim.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      await addDoc(collection(db, "laporan"), {
        imageUrl: form.imageBase64,
        deskripsi: form.deskripsi,
        lokasi: form.lokasi,
        jenisKasus: form.jenisKasus,
        namaPelapor: form.namaPelapor,
        noTelpPelapor: form.noTelpPelapor,
        emailPelapor: form.emailPelapor,
        status: "terkirim",
        createdAt: serverTimestamp(),
      });

      setMessage("Laporan berhasil terkirim!");
      setForm((prev) => ({
        ...prev,
        deskripsi: "",
        lokasi: "",
        imageBase64: "",
      }));
    } catch (err: any) {
      console.error(err);
      if (String(err).includes("longer than 1048487 bytes")) {
        setMessage("Ukuran foto terlalu besar!");
      } else {
        setMessage("Terjadi kesalahan saat mengirim laporan.");
      }
    }

    setLoading(false);
  };

  return {
    form,
    setForm,
    loading,
    message,
    checkingUser,
    handleImageChange,
    handleSubmit,
  };
}
