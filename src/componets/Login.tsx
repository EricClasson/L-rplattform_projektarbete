import { useState } from "react";
import { auth, usersCollection } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  
  const navigate = useNavigate();
  // Login function
  const login = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("user credentials",user);
      if (user) {
        // Get user data
        const userDoc = await getDoc(doc(usersCollection, user.uid));
        const userData = userDoc.data();
        if (userData) {
          navigate("/dashboard", { state: { role: userData.role } });
        }
        console.log("user data",userData?.role);
      }
    } catch (error) {
      console.log(error);
    }

  };
  return (
    <div className="w-full h-screen bg-zinc-100 flex items-center justify-center text-white">
      <div className="p-8 bg-white border shadow-md rounded-md flex flex-col gap-4 min-w-[400px]">
      <h1 className="text-zinc-900 text-center font-bold text-xl">Login</h1>
      <input
        type="text"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input"
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input"
      />
      <button className="button" onClick={login}>Login</button>
      

      </div>
    </div>
  );
}

export default Login;
