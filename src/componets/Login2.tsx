import { useState } from 'react';
import { auth, usersCollection } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { User, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import useSignInAndGetUser from '../hooks/useSignInAndGetUser';

const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { signIn, user, loading, error } = useSignInAndGetUser();

    // Login function
    const handleLogin = async () => {
        await signIn(email, password);
    };

    return (
        <div>
            <h1>Login</h1>
            <input
                type="text"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>

            {user && <div>{user.email}</div>}
        </div>
    );
};

export default Login;
