import { useEffect, useState } from 'react';
import useSignInAndGetUser from '../hooks/useSignInAndGetUser';

const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { signIn } = useSignInAndGetUser();

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
                <button className="button" onClick={handleLogin}>
                    Login
                </button>
            </div>
        </div>
    );
};

export default Login;
