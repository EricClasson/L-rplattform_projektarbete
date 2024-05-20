import { useLocation, Link } from "react-router-dom";
import Publish from "./Teacher/Publish/Publish";
import { IoBookSharp } from "react-icons/io5";
import { FaPen } from "react-icons/fa";
import { PiSignOutThin } from "react-icons/pi";
import { PiBooksLight } from "react-icons/pi";
import { IoPeopleOutline } from "react-icons/io5";
import { useState } from "react";
import { CiMenuFries } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";

const Dashboard = () => {
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(false);
  const { role } = location.state || { role: "guest" };

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 breakPoint:grid-cols-[170px_1fr] lg:gap-8 ">
        {openMenu && (
          <ul className="gap-12 bg-slate-300 px-4 h-full w-full breakPoint:hidden md:hidden max-breakPoint:absolute top-[6rem] flex flex-col items-center justify-center text-center">
            <li className="">
              <Link to={"/GetAssignmentsStudent"}>
                <IoBookSharp className="btn btn-square bg-slate-100 p-4" />
                Assignments
              </Link>
            </li>
            <li className="">
              <Link to={"/GetExamsStudent"}>
                <FaPen className="btn btn-square bg-slate-100 p-4" />
                <p>Exams</p>
              </Link>
            </li>
            <li className="">
              <PiBooksLight className="btn btn-square bg-slate-100 p-4" />
              <p>Programs</p>
            </li>
            <li className="">
              <IoPeopleOutline className="btn btn-square bg-slate-100 p-4" />
              <p>Students</p>
            </li>
          </ul>
        )}
        <div className="grid grid-row-4 relative place-items-center h-screen max-breakPoint:h-20  max-breakPoint:py-12 max-breakPoint:px-4 max-breakPoint:flex max-breakPoint:justify-between border-r-2 py-5 bg-slate-300">
          <div className="grid row-span-1 border place-items-center btn-circle bg-slate-100 hover:bg-slate-200 w-20 h-20">
            <h2 className="text-black text-xl">G</h2>
          </div>

          <ul className="max-breakPoint:hidden grid row-span-2 gap-20 md:justify-between md:flex justify-center text-center">
            <li className="">
              <Link to={"/GetAssignmentsStudent"}>
                <IoBookSharp className="btn btn-square bg-slate-100 p-4" />
                <p>Assignments</p>
              </Link>
            </li>
            <li className="">
              <Link to={"/GetExamsStudent"}>
                <FaPen className="btn btn-square bg-slate-100 p-4" />
                <p>Exams</p>
              </Link>
            </li>
            <li className="">
              <PiBooksLight className="btn btn-square bg-slate-100 p-4" />
              <p>Programs</p>
            </li>
            <li className="">
              <IoPeopleOutline className="btn btn-square bg-slate-100 p-4" />
              <p>Students</p>
            </li>
          </ul>
          <div className="max-breakPoint:flex max-breakPoint:items-center max-breakPoint:gap-5 ">
            <div className="grid">
              <div className="grid justify-center  ">
                <PiSignOutThin className="btn btn-square p-2 " />
              </div>
            </div>

            <div>
              <button
                className="breakPoint:hidden "
                onClick={() => setOpenMenu((prev) => !prev)}
              >
                {openMenu ? (
                  <RxCross1 className="btn btn-square bg-slate-100 p-3" />
                ) : (
                  <CiMenuFries className="btn btn-square bg-slate-100 p-3" />
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-center">Welcome to the dashboard {role}</h2>
          <div>{<Publish />}</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
