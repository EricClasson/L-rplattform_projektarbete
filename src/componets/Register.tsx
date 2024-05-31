import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { GoArrowRight } from "react-icons/go";
interface FormData {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
}

function Register() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
  });

  const [error, setError] = useState("");

  const auth = getAuth();
  const navigate = useNavigate();
  
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async () => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredentials.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        role: "student",
      });

      setFormData({
        email: "",
        password: "",
        firstname: "",
        lastname: "",
      });

      toast("Successfully created the user!", {
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

      navigate("/dashboard");
    } catch (error) {
      toast("Error creating the user!", {
        className: "bg-red-100 flex items-center",
        duration: 5000,
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21 3 3M21 3 3 21"
            />
          </svg>
        ),
        position: "top-right",
      });
      setError("Error creating the user");
    }
  };

  return (
    <div className="w-full h-screen bg-zinc-100 flex items-center justify-center text-white">
      <div className="p-8 bg-white border shadow-md rounded-md flex flex-col gap-4 min-w-[400px]">
        <h2 className="text-zinc-900">Register</h2>
        <input
          className="p-2 border rounded-md hover:border-zinc-400 text-zinc-900"
          type="text"
          placeholder="First Name"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
        />
        <input
          className="p-2 border rounded-md hover:border-zinc-400 text-zinc-900"
          type="text"
          placeholder="Last Name"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
        />
        <input
          className="p-2 border rounded-md hover:border-zinc-400 text-zinc-900"
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          className="p-2 border rounded-md hover:border-zinc-400 text-zinc-900"
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button
          className="flex bg-zinc-900 text-white p-2 rounded-md justify-center hover:bg-zinc-800"
          onClick={handleRegister}
        >
          Register
        </button>
        {error && <p className="text-red-600">{error}</p>}
        <Link to={"/"}>
          <p className="text-zinc-900">Already have an account? 
          <GoArrowRight className="inline-block m-4" />
          <strong>Login</strong>
          </p>
        </Link>
      </div>
    </div>
  );
}

export default Register;
