import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface FormData {
    email: string;
    password: string;
}

function Register() {
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');

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
            await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            toast('Successfully created the user!', {
                className: 'bg-green-100 flex items-center',
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
            });
            navigate('/');
        } catch (error: any) {
            setError(error.message);
        }
    };

    return (
        <div className="w-full h-screen bg-zinc-100 flex items-center justify-center text-white">
            <div className="p-8 bg-white border shadow-md rounded-md flex flex-col gap-4 min-w-[400px]">
                <h2 className="text-zinc-900">Register</h2>
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
            </div>
        </div>
    );
}

export default Register;
