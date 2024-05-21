import { Outlet, useLocation } from "react-router-dom";
import Publish from "./Teacher/Publish/Publish";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  const location = useLocation();

  const { role } = location.state || { role: "guest" };

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 breakPoint:grid-cols-[170px_1fr] lg:gap-8 ">
        <Sidebar />
        <div>
          <h2 className="text-center py-5">Welcome to the dashboard {role}</h2>
          {role === "teacher" && <Publish />}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
