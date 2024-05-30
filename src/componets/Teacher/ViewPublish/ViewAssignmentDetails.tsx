import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../../../firebase';

interface AssignmentDetails {
    title: string;
    information: string;
    date: string;
}
const ViewAssignmentDetails = () => {
    const { id } = useParams();

    const [assignmentDetails, setAssignmentDetails] = useState<AssignmentDetails | null>(null);


    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                const docRef = doc(db, 'Assignments', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data() as AssignmentDetails;
                    setAssignmentDetails(data);
                }
            };
            fetchData();
        }
    }, [id]);
    return (
        <div className="flex flex-col">
            <div className="flex p-8 border shadow-md rounded-md flex-col items-center gap-4">
                <h1 className="text-zinc-900 font-bold">Assignment details</h1>
                <p className="text-zinc-900 font-semibold">{assignmentDetails?.title}</p>
                <p className="text-zinc-900">{assignmentDetails?.information}</p>
                <p className="text-zinc-600 text-xs">{assignmentDetails?.date}</p>
            </div>
        </div>
    );
};

export default ViewAssignmentDetails;
