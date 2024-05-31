import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";

const Dashboard = () => {
  const { userData } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!userData) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 breakPoint:grid-cols-[170px_1fr] lg:gap-8 ">
        <Sidebar role={userData?.role} />
        <div>
          <h2 className="text-center py-5">
            Welcome {userData?.firstname} {userData?.lastname}{" "}
          </h2>

          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
