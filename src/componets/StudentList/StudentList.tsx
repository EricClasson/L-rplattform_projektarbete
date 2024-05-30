
import { useState, useEffect } from 'react';
import { onSnapshot, doc, collection, deleteDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'sonner';

interface Student {
  id: string;
  role: string;
  email: string;
  firstname: string;
  lastname: string;
}

const StudentList = () => {

    const [studentList, setStudentList] = useState<Student[]>([]);

    const { userData } = useAuth();
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
        toast("Successfully deleted the student!", {
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
          position: 'top-center',
        });
    };

  return (
    <div className="grid justify-items-center grid-flow-row ">
      <h2 className="font-semibold py-6">StudentList</h2>

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
