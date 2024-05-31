import { useState } from "react";
import useSignInAndGetUser from "../hooks/useSignInAndGetUser";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { signIn } = useSignInAndGetUser();

  // Login function
  const handleLogin = async () => {
    await signIn(email, password);
    toast("Logged in succesfully", {
      className: "bg-green-100 flex items-center",
      duration: 5000,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      ),
      position: "top-right",
    });
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

        <button className="buttonGreen" onClick={handleLogin}>
          Login
        </button>

        <button className="button">
          <Link to={"/register"}>Create your own account</Link>
        </button>
      </div>
    </div>
  );
};

export default Login;
