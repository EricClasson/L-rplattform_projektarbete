import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();

    const userlogout = async () => {
        try {
            await signOut(auth).then(() => {
                navigate('/');
            });
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <h1>Sign Out Page</h1>
            <button onClick={userlogout}>SignOut</button>
        </div>
    );
}

export default Logout;
