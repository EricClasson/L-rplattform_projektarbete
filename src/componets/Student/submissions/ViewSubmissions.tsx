import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { collection, getDocs, query } from "firebase/firestore"
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
        <h1 className="text-zinc-900 font-bold text-center">Submissions</h1>
        <ul>
            {submissions.map((submission, index) => (
            <li className="shadow-xl p-8 mt-8 rounded-xl" key={index}>
                <p><strong>Student Name:</strong> {submission.studentName}</p>
                <p><strong>Answer:</strong> {submission.answer}</p>
            </li>
            ))}
            {submissions.length === 0 && <p className="text-center">No submissions yet</p>}
        </ul>
    </div>
  )
}

export default ViewSubmissions