import { useState, useEffect } from 'react';
import { collection, onSnapshot, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../../firebase';
import { PublishDoc } from '../Publish/Publish';
import { Link } from 'react-router-dom';
import SubmitAssignment from '../../Student/submissions/SubmitAssignment';
import { useAuth } from '../../../hooks/useAuth';
export default function ViewAssignments() {
    const [Assignments, setAssignment] = useState<PublishDoc[]>([]);
    const [editId, setEditId] = useState<string | null>(null);
    const [titleChange, setTitleChange] = useState<string>('');
    const [informationChange, setInformationChange] = useState<string>('');

    const { userData } = useAuth();
    const role = userData?.role;

    useEffect(() => {
        const unsub = onSnapshot(collection(db, 'Assignments'), (snapshot) => {
            const Publish: PublishDoc[] = snapshot.docs.map((doc) => ({
                ...(doc.data() as PublishDoc),
                id: doc.id,
            }));
            setAssignment(Publish);
            console.log(Publish);
        });
        return () => unsub();
    }, []);
    // Get the assignment details by id

    const handleDelete = async (id: string) => {
        await deleteDoc(doc(db, 'Assignments', id));
    };

    const handleUpdate = async (id: string) => {
        try {
            await updateDoc(doc(db, 'Assignments', id), {
                title: titleChange,
                information: informationChange,
            });
            setEditId(null);
            setTitleChange('');
            setInformationChange('');
        } catch (error) {
            console.log("It didn't update", error);
        }
    };

    return (
        <div className="flex flex-col">
            <h2 className="text-center font-semibold py-6">Assignments</h2>
            <ul className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8">
                {Assignments.map((index) => (
                    <li
                        key={index.id}
                        className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-lg sm:p-6 flex flex-col gap-4"
                    >
                        {editId === index.id ? (
                            <>
                                <label>Title</label>
                                <input
                                    placeholder="Title"
                                    className="input border border-black "
                                    type="text"
                                    value={titleChange}
                                    onChange={(e) => setTitleChange(e.target.value)}
                                />
                                <label>Description</label>
                                <textarea
                                    className="input border border-black"
                                    placeholder="Information"
                                    rows="8"
                                    value={informationChange}
                                    onChange={(e) => setInformationChange(e.target.value)}
                                ></textarea>
                                <button
                                    className="buttonGreen"
                                    onClick={() => handleUpdate(index.id)}
                                >
                                    Update
                                </button>
                            </>
                        ) : (
                            <>
                                <div className="flex flex-col gap-4">
                                    <div>
                                        <div className="flex flex-row gap-1">
                                            <p className="text-xs"> Publish date: </p>
                                            <p className="text-xs font-semibold ">
                                                {index.date.slice(0, 10)}
                                            </p>
                                        </div>
                                        <div className="flex flex-row gap-1">
                                            <p className="text-xs"> Deadline: </p>
                                            <p className="text-xs font-semibold ">
                                                {index.dueDate
                                                    ? index.dueDate.slice(0, 10)
                                                    : 'No deadline'}
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                        <h2>Title: {index.title}</h2>
                                        <h3>Type: {index.option}</h3>
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <h3>Description:</h3>{' '}
                                    <p className="text-xs">{index.information}</p>
                                </div>
                            </>
                        )}
                        <div className="flex flex-row items-center gap-5">
                            {role === 'teacher' && (
                                <button
                                    onClick={() => handleDelete(index.id)}
                                    className="button py-5"
                                >
                                    Delete
                                </button>
                            )}
                            {editId !== index.id && role === 'teacher' && (
                                <button
                                    className="buttonTeal w-16"
                                    onClick={() => {
                                        setEditId(index.id);
                                        setTitleChange(index.title);
                                        setInformationChange(index.information);
                                    }}
                                >
                                    Edit
                                </button>
                            )}
                            <Link to={`/dashboard/GetAssignmentsTeacher/${index.id}`}>
                                <button className="button border">View</button>
                            </Link>
                            <Link to={`/dashboard/SubmitAssignment/${index.id}`}>
                                <button className="buttonGreen">Submit</button>
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
