"use client";

import { useEffect, useState, ChangeEvent } from "react";
import { auth, db, } from "@/libs/firebase";
import Image from "next/image";
import { onAuthStateChanged, updateProfile, User } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/navigation";
import {
  FaEnvelope,
  FaIdBadge,
  FaPhone,
  FaUser,
  FaEdit,
  FaSignOutAlt,
} from "react-icons/fa";

// ==============================
//  Types
// ==============================
interface UserData {
  name: string;
  email: string;
  phone: string;
  photo: string;
  createdAt: string;
}

interface EditData {
  name: string;
  phone: string;
  photoFile: File | null;
}

export default function ProfilePage() {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);

  const [userData, setUserData] = useState<UserData>({
    name: "",
    email: "",
    phone: "",
    photo: "",
    createdAt: "",
  });

  const [editData, setEditData] = useState<EditData>({
    name: "",
    phone: "",
    photoFile: null,
  });

  // ==========================
  // Load User (Auth + Firestore)
  // ==========================
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/login");
        return;
      }

      setFirebaseUser(user);

      const docRef = doc(db, "users", user.uid);
      const snap = await getDoc(docRef);

      if (snap.exists()) {
        const data = snap.data();

        const createdDate = data.createdAt
          ? new Date(data.createdAt.seconds * 1000).toLocaleDateString()
          : "-";

        setUserData({
          name: data.nama ?? "Pengguna Tanpa Nama",
          email: data.email ?? user.email ?? "-",
          phone: data.notelp ?? "-",
          photo: user.photoURL ?? "/assets/profile.webp",
          createdAt: createdDate,
        });

        setEditData({
          name: data.nama ?? "",
          phone: data.notelp ?? "",
          photoFile: null,
        });
      }

      setLoading(false);
    });

    return () => unsub();
  }, [router]);

  // ==========================
  // Handle File Change
  // ==========================
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setEditData((prev) => ({
        ...prev,
        photoFile: e.target.files![0],
      }));
    }
  };

  // ==========================
  // Save Profile
  // ==========================
  const handleSave = async () => {
    if (!firebaseUser) return;

    let photoURL = userData.photo;

    // Upload foto jika ada file baru
    if (editData.photoFile) {
        alert("Fitur ubah foto profil sedang dalam perbaikan. Silakan coba lagi nanti.");
    }

    // Update Firestore
    await updateDoc(doc(db, "users", firebaseUser.uid), {
      nama: editData.name,
      notelp: editData.phone,
      photo: photoURL,
    });

    // Update UI
    setUserData((prev) => ({
      ...prev,
      name: editData.name,
      phone: editData.phone,
      photo: photoURL,
    }));

    setIsOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-lg">
        Memuat profil...
      </div>
    );
  }

  return (
    <section className="min-h-screen py-20 px-6 flex justify-center">
      <div className="w-full max-w-4xl bg-white/50 backdrop-blur-xl shadow-xl rounded-2xl p-8 border border-white/40">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-8 text-center">
          Profil Pengguna
        </h1>

       

        <div className="flex flex-col items-center md:flex-row gap-10">
          {/* Avatar */}
          <div className="relative">
            <Image
              src={userData.photo}
              alt="Profile"
              width={180}
              height={180}
              className="rounded-2xl shadow-lg object-cover border-4 border-white"
            />
          </div>

          {/* Profile Info */}
          <div className="flex-1 w-full">
            <div className="bg-white shadow-md rounded-2xl p-6 mb-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-blue-700 mb-4">
                Informasi Akun
              </h2>

              <div className="flex items-center gap-4 mb-4">
                <FaUser className="text-blue-600 text-xl" />
                <p className="text-gray-800">
                  <span className="font-semibold">Nama:</span> {userData.name}
                </p>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <FaEnvelope className="text-blue-600 text-xl" />
                <p className="text-gray-800">
                  <span className="font-semibold">Email:</span> {userData.email}
                </p>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <FaPhone className="text-blue-600 text-xl" />
                <p className="text-gray-800">
                  <span className="font-semibold">Nomor HP:</span> +62{" "}
                  {userData.phone}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <FaIdBadge className="text-blue-600 text-xl" />
                <p className="text-gray-800">
                  <span className="font-semibold">Dibuat:</span>{" "}
                  {userData.createdAt}
                </p>
              </div>
            <div className="flex justify-between mt-2">

               {/* Button Edit */}
                <div className="flex justify-end mb-4">
                <button
                    onClick={() => setIsOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
                >
                    <FaEdit /> Edit Profil
                </button>
                </div>

                {/* Button Logout */}
                <div className="flex justify-end mb-4">
                <button
                    onClick={() => auth.signOut().then(() => router.push("/auth/login"))}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-xl shadow hover:bg-red-700 transition"
                >
                    <FaSignOutAlt /> Logout
                </button>
                </div>
            </div>
            </div>
          </div>
        </div>

        {/* ============================
            Modal Edit Profil
        ============================ */}
        {isOpen && (
          <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 text-black">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md animate-fadeIn">

              <h2 className="text-xl font-bold text-blue-700 mb-4">
                Edit Profil
              </h2>

              {/* Nama */}
              <label className="block mb-3">
                <p className="font-medium">Nama</p>
                <input
                  type="text"
                  className="w-full mt-1 p-3 border rounded-lg"
                  value={editData.name}
                  onChange={(e) =>
                    setEditData((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </label>

              {/* Nomor HP */}
              <label className="block mb-3">
                <p className="font-medium">Nomor HP</p>
                <div className="flex items-center gap-2">
                  <p>+62</p>
                    <input
                    type="text"
                    className="w-full mt-1 p-3 border rounded-lg"
                    value={editData.phone}
                    onChange={(e) =>
                        setEditData((prev) => ({ ...prev, phone: e.target.value }))
                    }
                    />
                </div>
              </label>


              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                >
                  Batal
                </button>

                <button
                  onClick={handleSave}
                  className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
