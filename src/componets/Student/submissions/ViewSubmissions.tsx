import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../../../../firebase"
import withLoading from "../../../HOC"

const ViewSubmissions = () => {
    const { id } = useParams<{ id: string }>()
    const [submissions, setSubmissions] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const getSubmissions = async () => {
            setLoading(true)
            const q = query(collection(db, `Assignments/${id}/submissions`))
            const querySnapshot = await getDocs(q)
            const submissions: any[] = []
            querySnapshot.forEach((doc) => {
                submissions.push(doc.data())
            })
            setSubmissions(submissions)
            setLoading(false)
        }
        getSubmissions()
    }, [id])
    
  return (
    <div>
        {loading && <h1>Loading...</h1>}
        <h1 className="text-zinc-900 font-bold text-center">Submissions</h1>
        <ul>
            {submissions.map((submission, index) => (
            <li className="shadow-xl p-8 mt-8 rounded-xl" key={index}>
                <p><strong>Student Name:</strong> {submission.studentName}</p>
                <p><strong>Answer:</strong> {submission.answer}</p>
            </li>
            ))}
        </ul>
    </div>
  )
}

export default ViewSubmissions

