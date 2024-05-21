import { useEffect, useState } from 'react';
import { auth, usersCollection } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { User, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import useSignInAndGetUser from '../hooks/useSignInAndGetUser';
import { fetchUsersByRole } from '../helpers';
import { toast } from "sonner";

const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { signIn, user, loading, error } = useSignInAndGetUser();

    useEffect(() => {
        const fetchData = async () => {
            const students = await fetchUsersByRole('student');
            const teachers = await fetchUsersByRole('teacher');

            console.log('=== STUDENTS ===', students);
            console.log('=== TEACHERS ===', teachers);
        };

        fetchData();
    }, []);

    // Login function
    const handleLogin = async () => {
        await signIn(email, password);
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
};
