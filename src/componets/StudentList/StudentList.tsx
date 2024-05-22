import React, { useState, useEffect } from "react";
import {
  onSnapshot,
  doc,
  getDoc,
  collection,
  deleteDoc,
} from "firebase/firestore";
import { db, usersCollection } from "../../../firebase";
import { useLocation, Link } from "react-router-dom";

type Props = {};

interface Student {
  id: string;
  role: string;
  email: string;
}

const StudentList = (props: Props) => {
  const [studentList, setStudentList] = useState<Student[]>([]);
  const user = window.localStorage.getItem("user") || "";
  const role = JSON.parse(user).role;
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "users"), (snapshot) => {
      const list: Student[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Student[];

      const result = list.filter((student) => student.role === "student");
      setStudentList(result);
    });
    return () => unsub();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "users", id));
  };

  return (
    <div className="grid justify-items-center grid-flow-row py-10">
      <h2>StudentList</h2>
      <div className="flex flex-row justify-between w-full px-5">
        <div></div>
        <div></div>
        {
          role === "teacher" && (
        <div className="">
          <button className="button">
            <Link to={"/register"}>New Student</Link>
          </button>
        </div>

          )
        }
      </div>

      <ul className="grid grid-cols-3 py-10 gap-8 ">
        {studentList.map((student) => (
          <li key={student.email} className="w-full">
            <div className="card w-96 bg-base-100 shadow-xl">
              <figure className="px-8 pt-8 flex flex-col items-center">
                <div className="btn btn-circle"></div>
                <p>Name</p>
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">{student.email}</h2>
                <p>{student.role}</p>
                {
                  role === "teacher" && (
                <div className="card-actions">
                  <button
                    className="button"
                    onClick={() => handleDelete(student.id)}
                  >
                    Remove
                  </button>
                </div>

                  )
                }
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;
