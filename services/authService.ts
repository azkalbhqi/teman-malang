
import { auth, db } from "@/libs/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export const register = async ({ nama, email, notelp, password }: any) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, "users", res.user.uid), {
      nama,
      email,
      notelp,
      createdAt: new Date(),
    });

    return { user: res.user };
  } catch (err: any) {
    return { error: err.message };
  }
};

export const login = async ({ email, password }: any) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return { user: res.user };
  } catch (err: any) {
    return { error: err.message };
  }
};
