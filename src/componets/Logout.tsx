import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

function Logout() {
    const navigate = useNavigate();

    const userlogout = async () => {
        try {
            await signOut(auth).then(() => {
                toast('Successfully logged out!', {
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
            });
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="flex flex-col items-center justify-center p-3 gap-2 shadow-md border">
            <h1 className=" text-xl font-semibold">Sign Out Page</h1>
            <button onClick={userlogout} className="button">
                SignOut
            </button>
        </div>
    );
}

export default Logout;
