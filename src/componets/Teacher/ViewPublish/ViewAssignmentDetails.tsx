
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { db } from '../../../../firebase';


const ViewAssignmentDetails = () => {
    const { id } = useParams()
    const [assignmentDetails, setAssignmentDetails] = useState<any>(null)
    
    console.log("This is the assignment details",id)
    
    useEffect(() => {
        if (id) {
          const fetchData = async () => {
            const docRef = doc(db, "Assignments", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              const data = docSnap.data();
                setAssignmentDetails(data);
                console.log("This is the data",data)
            }
          };
          fetchData();
        }
      }, [id]);
    return (
    <div>
        <h1>Assignment Details</h1>
        <div>
            <h2>{assignmentDetails?.title}</h2>
            <p>{assignmentDetails?.information}</p>
            <p>{assignmentDetails?.date}</p>
            <p>{assignmentDetails?.title}</p>
        </div>
    </div>
  )
}

export default ViewAssignmentDetails