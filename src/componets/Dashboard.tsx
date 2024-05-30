import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAuth } from '../hooks/useAuth';
import { useEffect, useState } from 'react';

const Dashboard = () => {
    const { userData } = useAuth();
    const [isLoading, setIsLoading] = useState(true)
    
    return (
        <div>
            <div className="grid grid-cols-1 gap-4 breakPoint:grid-cols-[170px_1fr] lg:gap-8 ">
                <Sidebar role={userData?.role} />
                <div>
                    <h2 className="text-center py-5">
                        Welcome {userData?.firstname} {userData?.lastname}{' '}
                    </h2>
                    
                    <Outlet />
                    
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
