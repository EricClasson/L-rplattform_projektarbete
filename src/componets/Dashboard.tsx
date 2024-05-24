
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";


const Dashboard = () => {
    // const user = window.localStorage.getItem('user') || '';
    // const role = JSON.parse(user).role;
    const { user, userData, loading } = useAuth();

    return (
        <div>
            <div className="grid grid-cols-1 gap-4 breakPoint:grid-cols-[170px_1fr] lg:gap-8 ">
                <Sidebar role={userData?.role} />
                <div>
                    <h2 className="text-center py-5">
                        Welcome to the dashboard {userData?.role}, {userData?.firstname}{' '}
                        {userData?.lastname}{' '}
                    </h2>

                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
