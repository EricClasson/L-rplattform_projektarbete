import { Outlet } from "react-router-dom";
import Publish from "./Teacher/Publish/Publish";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  const user = window.localStorage.getItem("user") || "";
  const role = JSON.parse(user).role;
  
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 breakPoint:grid-cols-[170px_1fr] lg:gap-8 ">
        <Sidebar role={role}/>
        <div>

          <h2 className="text-center py-5">Welcome to the dashboard {role}</h2>
          

          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
