import React from "react";
import { useState, useEffect } from "react";
import { collection, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import { PublishDoc } from "../Publish/Publish";

export default function ViewExams() {
  const [Assignments, setAssignment] = useState<PublishDoc[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "p_Exams"), (snapshot) => {
      const Publish: PublishDoc[] = snapshot.docs.map((doc) => ({
        ...(doc.data() as PublishDoc),
        id: doc.id,
      }));
      setAssignment(Publish);
    });
    return () => unsub();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "Assignments", id));
  };

  return (
    <div className="flex flex-col ">
      <h2 className="text-center">Exams</h2>
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
            <button
              onClick={() => handleDelete(index.id)}
              className=" border border-black px-5"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
