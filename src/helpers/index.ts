import { Timestamp, addDoc, collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { db, usersCollection } from "../../firebase";

interface User {
    uid: string;
    email: string;
    role: 'student' | 'teacher'
}

interface StudentAssignment {
    assignmentId: string;
    studentId: string;
    assignedDate: Timestamp;
    status: 'assigned' | 'completed'
}

export const fetchUsersByRole = async (role: 'student' | 'teacher'): Promise<User[]> => {
    const q = query(usersCollection, where("role", "==", role))
    const snapshot = await getDocs(q)

    return snapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() } as User))
}

export const createRelationship = async (studentId: string, teacherId: string) => {
    const relationship = {
        studentId,
        teacherId
    }

    await addDoc(collection(db, 'relationships'), relationship)
}

export const createAssignment = async (title: string, description: string, teacherId: string): Promise<string> => {
    const assignment = {
        title,
        description,
        teacherId
    }

    const addAssignment = await addDoc(collection(db, "Assignments"), assignment)
    console.log(addAssignment.id)
    return addAssignment.id
}

export const assignAssignmentToStudent = async (assignmentId: string, studentId: string) => {
    const studentAssignment: StudentAssignment = {
        assignmentId,
        studentId,
        assignedDate: Timestamp.now(),
        status: 'assigned'
    }

    await addDoc(collection(db, `users/${studentId}/studentAssignments`), studentAssignment)
}

export const getAssignmentsForStudent = async (studentId: string): Promise<StudentAssignment[]> => {
    const q = query(collection(db, `users/${studentId}/studentAssignments`))
    const snapshot = await getDocs(q)

    return snapshot.docs.map(doc => ({ assignmentId: doc.id, ...doc.data() } as StudentAssignment) )
}