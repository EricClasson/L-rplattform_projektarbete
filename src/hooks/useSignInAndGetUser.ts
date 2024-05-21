import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth, usersCollection } from "../../firebase";
import { getDocs, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

interface User {
  uid: string;
  email: string;
  role: "student" | "teacher";
}

const useSignInAndGetUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const loggedInUser = userCredential.user;

      if (loggedInUser) {
        const q = query(usersCollection, where("uid", "==", loggedInUser.uid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          setUser(userDoc.data() as User);
        } else {
          throw new Error("User document not found");
        }
      }
    } catch (error) {
      setError(error.message || "An error occured.");
    } finally {
      setLoading(false);
      navigate("/dashboard", { state: { role: user?.role } });
    }
  };

  return { signIn, user, loading, error };
};

export default useSignInAndGetUser;
