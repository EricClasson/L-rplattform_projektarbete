
import React, { useState, useEffect } from 'react';
import { onSnapshot, doc, collection, deleteDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface Student {
  id: string;
  role: string;
  email: string;
  firstname: string;
  lastname: string;
}

const StudentList = () => {

    const [studentList, setStudentList] = useState<Student[]>([]);

    const { user, userData, loading } = useAuth();
    const role = userData?.role;

    useEffect(() => {
        const unsub = onSnapshot(collection(db, 'users'), (snapshot) => {
            const list: Student[] = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as Student[];

            const result = list.filter((student) => student.role === 'student');
            setStudentList(result);
        });
        return () => unsub();
    }, []);


    const handleDelete = async (id: string) => {
        await deleteDoc(doc(db, 'users', id));
    };

  return (
    <div className="grid justify-items-center grid-flow-row ">
      <h2 className="font-semibold py-6">StudentList</h2>
      <div className="flex flex-row justify-between w-full px-5">
        <div></div>
        <div></div>
        {role === "teacher" && (
          <div className="">
            <button className="button">
              <Link to={"/register"}>New Student</Link>
            </button>
          </div>
        )}
      </div>

      <ul className="grid grid-cols-2 py-10 gap-10 max-breakPoint3:flex max-breakPoint3:flex-col  breakPoint2:grid-cols-3 ">
        {studentList.map((student) => (
          <li key={student.email} className="hover:shadow-lg">
            <div className="card w-96 bg-base-100 shadow-xl">
              <figure className="px-8 pt-8 flex flex-col flex-wrap items-center">
                <div className="btn btn-circle">
                  <p>{student.firstname.slice(0, 1).toUpperCase()}</p>
                </div>
                <div className="flex flex-row gap-1">
                  <p>{student.firstname}</p>
                  <p>{student.lastname}</p>
                </div>
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">{student.email}</h2>
                <p>{student.role}</p>
                {role === "teacher" && (
                  <div className="card-actions">
                    <button
                      className="button"
                      onClick={() => handleDelete(student.id)}
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;
