import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth, usersCollection } from "../../firebase";
import { getDoc,doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";


interface User {
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
        console.log("=== LOGGED IN USER ===", loggedInUser);
      if (loggedInUser) {
        // Get user data
        const userDoc = await getDoc(doc(usersCollection, loggedInUser?.uid));
        const userData = userDoc.data();
        console.log("=== USER DATA ===", userData);
        if (userData) {
          setUser(userData as User);
          console.log("=== USER ===", user);
          navigate("/dashboard", { state: { role: userData?.role } });
        }
      }
    } catch (error) {
      setError(error.message || "An error occured.");
    }
  };

  return { signIn, user, loading, error };
};

export default useSignInAndGetUser;
