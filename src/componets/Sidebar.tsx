import { useState } from "react";
import { Link } from "react-router-dom";
import { CiMenuFries } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";
import { IoBookSharp } from "react-icons/io5";
import { FaPen } from "react-icons/fa";
import { PiSignOutThin } from "react-icons/pi";
import { IoPeopleOutline } from "react-icons/io5";
import { TbArrowBigUpLines } from "react-icons/tb";
type Props = {
  role: string;
};

const Sidebar = (prop: Props) => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div>
      {openMenu && (
        <ul className="gap-12 z-10 bg-slate-300 overflow-y-auto px-4 max-breakPoint:h-screen w-full breakPoint:hidden md:hidden max-breakPoint:fixed top-[6rem] flex flex-col items-center justify-center text-center">
          {prop.role === "teacher" && (
            <li>
              <Link
                onClick={() => setOpenMenu((prev) => !prev)}
                to={"/dashboard/Publish"}
              >
                <TbArrowBigUpLines className="btn btn-square bg-slate-100 p-4" />
                <p>Publish</p>
              </Link>
            </li>
          )}

          <li className="">
            <Link
              onClick={() => setOpenMenu((prev) => !prev)}
              to={"/dashboard/GetAssignments"}
            >
              <IoBookSharp className="btn btn-square bg-slate-100 p-4" />
              <p>Assignments</p>
            </Link>
          </li>
          <li className="">
            <Link
              onClick={() => setOpenMenu((prev) => !prev)}
              to={"/dashboard/GetExams"}
            >
              <FaPen className="btn btn-square bg-slate-100 p-4" />
              <p>Exams</p>
            </Link>
          </li>
          <li className="">
            <Link
              onClick={() => setOpenMenu((prev) => !prev)}
              to={"/dashboard/GetStudents"}
            >
              <IoPeopleOutline className="btn btn-square bg-slate-100 p-4" />
              <p>Students</p>
            </Link>
          </li>
        </ul>
      )}
      <div className="grid z-10 grid-row-4 max-breakPoint:w-full max-breakPoint:fixed max-breakPoint:top-0 sticky top-0 place-items-center h-screen max-breakPoint:h-20  max-breakPoint:py-12 max-breakPoint:px-4 max-breakPoint:flex max-breakPoint:justify-between border-r-2 py-5 bg-slate-300">
        <div className="grid row-span-1 border place-items-center btn-circle bg-slate-100 hover:bg-slate-200 w-20 h-20">
          <h2 className="text-black text-xl">
            {prop.role === "teacher" && "T"}
            {prop.role === "student" && "S"}
          </h2>
        </div>

        <ul className="max-breakPoint:hidden grid row-span-2 gap-20 md:justify-between md:flex justify-center text-center">
          {prop.role === "teacher" && (
            <li>
              <Link to={"/dashboard/Publish"}>
                <TbArrowBigUpLines className="btn btn-square bg-slate-100 p-4" />
                <p>Publish</p>
              </Link>
            </li>
          )}

          <li className="">
            <Link to={"/dashboard/GetAssignments"}>
              <IoBookSharp className="btn btn-square bg-slate-100 p-4" />
              <p>Assignments</p>
            </Link>
          </li>
          <li className="">
            <Link to={"/dashboard/GetExams"}>
              <FaPen className="btn btn-square bg-slate-100 p-4" />
              <p>Exams</p>
            </Link>
          </li>
          <li className="">
            <Link to={"/dashboard/GetStudents"}>
              <IoPeopleOutline className="btn btn-square bg-slate-100 p-4" />
              <p>Students</p>
            </Link>
          </li>
        </ul>
        <div className="max-breakPoint:flex max-breakPoint:items-center max-breakPoint:gap-5 ">
          <div className="grid">
            <div className="grid justify-center  ">
              <Link to={"/dashboard/Logout"}>
                <PiSignOutThin className="btn btn-square p-2 " />
              </Link>
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
    </div>
  );
};

export default Sidebar;
