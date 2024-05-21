import { Timestamp, collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import { db } from "../../firebase";

interface StudentAssignment {
    assignmentId: string;
    studentId: string;
    assignedDate: Timestamp;
    status: 'assigned' | 'completed'
}

const useGetStudentAssignments = () => {
    const [assignments, setAssignments] = useState<StudentAssignment[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>('')

    const { user } = useAuth()

    useEffect(() => {
        const fetchAssignments = async () => {
            setLoading(true)
            setError(null)

            console.log('wallaaa')

            try {
                if (user) {
                    const studentAssignmentQuery = query(collection(db, `users/${user.uid}/studentAssignments`))
                    const studentAssignmentSnapshot = await getDocs(studentAssignmentQuery)
                    const assignmentIds = studentAssignmentSnapshot.docs.map(doc => doc.data().assignmentId)

                    if (assignmentIds.length > 0) {
                        const assignmentsQuery = query(collection(db, 'Assignments'), where('__name__', 'in', assignmentIds))
                        const assignmentSnapshot = await getDocs(assignmentsQuery)
                        const assignmentsData = assignmentSnapshot.docs.map(doc => ({ assignmentId: doc.id, ...doc.data() } as StudentAssignment))
                        setAssignments(assignmentsData)
                    } else {
                        setAssignments([])
                    }
                }
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }
        fetchAssignments()
    }, [])

    return { assignments, loading, error }
}

export default useGetStudentAssignments