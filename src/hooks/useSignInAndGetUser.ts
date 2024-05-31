import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth, usersCollection } from "../../firebase";
import { getDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

interface User {
  email: string;
  role: string;
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
        // Get user data
        const userDoc = await getDoc(doc(usersCollection, loggedInUser?.uid));
        const userData = userDoc.data();
        console.log(userData);
        window.localStorage.setItem("user", userData);

        if (userData?.role === "teacher") {
          setUser(userData as User);
          setLoading(false);
          navigate("/dashboard/Publish", { state: { role: userData?.role } });
        } else if (userData?.role === "student") {
          setUser(userData as User);
          setLoading(false);
          navigate("dashboard/GetAssignments", {
            state: { role: userData?.role },
          });
        }
      }
    } catch (error) {
      setError("An error occured.");
    }
  };

  return { signIn, user, loading, error };
};

export default useSignInAndGetUser;
