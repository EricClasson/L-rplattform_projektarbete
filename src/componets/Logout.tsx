import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();

    const userlogout = async () => {
        try {
            await signOut(auth).then(() => {
                window.localStorage.removeItem('user');
                navigate('/');
            });
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className='flex flex-col items-center justify-center p-3 gap-2 shadow-2xl border'>
            <h1 className=' text-xl font-semibold'>Sign Out Page</h1>
            <button onClick={userlogout} className='button'>SignOut</button>
        </div>
    );
}

export default Logout;
