import { useState, useEffect } from "react";
import { collection, onSnapshot, doc } from "firebase/firestore";
import { db } from "../../../../firebase";
import { PublishDoc } from "../../Teacher/Publish/Publish";

const ViewAssignmentsStudent = () => {
  const [Assignments, setAssignment] = useState<PublishDoc[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "Assignments"), (snapshot) => {
      const Publish: PublishDoc[] = snapshot.docs.map((doc) => ({
        ...(doc.data() as PublishDoc),
        id: doc.id,
      }));
      setAssignment(Publish);
    });
    return () => unsub();
  }, []);

  return (
    <div className="flex flex-col ">
      <h2 className="text-center font-semibold py-6">Assignment</h2>
      <ul className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8">
        {Assignments.map((index) => (
          <li
            key={index.id}
            className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-lg sm:p-6"
          >
            <div>
              <h2>{index.title}</h2>
              <h3>{index.option}</h3>
            </div>
            <div>
              <p>{index.information}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewAssignmentsStudent;
