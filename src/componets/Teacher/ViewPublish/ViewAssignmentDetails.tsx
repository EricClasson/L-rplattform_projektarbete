import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../../../firebase';

const ViewAssignmentDetails = () => {
    const { id } = useParams();
    const [assignmentDetails, setAssignmentDetails] = useState<any>(null);

    console.log('This is the assignment details', id);

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                const docRef = doc(db, 'Assignments', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setAssignmentDetails(data);
                    console.log('This is the data', data);
                }
            };
            fetchData();
        }
    }, [id]);
    return (
        <div className="w-full h-screen flex items-center justify-center text-white">
            <div className="p-8 bg-white border shadow-md rounded-md flex flex-col gap-4 min-w-[400px]">
                <h1 className="text-zinc-900 font-bold">Assignment Details</h1>
                <div>
                    <h2 className="text-zinc-900 font-semibold py-2">{assignmentDetails?.title}</h2>
                    <p className="text-zinc-900 py-6">{assignmentDetails?.information}</p>
                    <p className="text-zinc-600 text-xs">{assignmentDetails?.date}</p>
                    {/* <p className="text-zinc-900 font-semibold">{assignmentDetails?.title}</p> */}
                </div>
            </div>
        </div>
    );
};

export default ViewAssignmentDetails;
