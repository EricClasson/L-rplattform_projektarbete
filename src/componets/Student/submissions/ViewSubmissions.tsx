import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../../../../firebase"

const ViewSubmissions = () => {
    const { id } = useParams<{ id: string }>()
    const [submissions, setSubmissions] = useState<any[]>([])
    useEffect(() => {
        const getSubmissions = async () => {
            const q = query(collection(db, `Assignments/${id}/submissions`))
            const querySnapshot = await getDocs(q)
            const submissions: any[] = []
            querySnapshot.forEach((doc) => {
                submissions.push(doc.data())
            })
            setSubmissions(submissions)
        }
        getSubmissions()
    }, [id])
  return (
    <div>
        <h1 className="text-zinc-900 font-bold">Submissions</h1>
        <ul>
            {submissions.map((submission, index) => (
            <li key={index}>
                <p>Student Name: {submission.studentName}</p>
                <p>Answer: {submission.answer}</p>
            </li>
            ))}
        </ul>
    </div>
  )
}

export default ViewSubmissions