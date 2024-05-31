import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function Logout() {
  const navigate = useNavigate();

  const userlogout = async () => {
    try {
      await signOut(auth).then(() => {
        toast("Successfully logged out!", {
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
        navigate("/");
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="center">
      <div className="flex flex-col p-20 rounded-xl shadow-xl items-center m-auto justify-center gap-4 border">
        <h1 className=" text-xl font-semibold">Are you sure to sign out?</h1>
        <div className="flex w-full justify-center">
          <button onClick={userlogout} className="buttonRed w-full ">
            SignOut
          </button>
        </div>
      </div>
    </div>
  );
}

export default Logout;
