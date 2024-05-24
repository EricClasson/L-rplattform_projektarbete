import { useEffect, useState } from 'react';
import { addDoc, collection, getDocs, query, Timestamp, where } from 'firebase/firestore';
import { db, auth, usersCollection } from '../../../../firebase';
import { useAuth } from '../../../hooks/useAuth';
import { useParams } from 'react-router-dom';
import ViewAssignmentDetails from '../../Teacher/ViewPublish/ViewAssignmentDetails';

const SubmitAssignment = () => {
    const [answer, setAnswer] = useState<string>('')
    const [success, setSuccess] = useState<string>("")
    const [error, setError] = useState<string>("")
    const [submitted, setSubmitted] = useState<boolean>(false)
    const { user, userData, loading } = useAuth();
    const { id } = useParams<{ id: string }>();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            await addDoc(collection(db, `Assignments/${id}/submissions`), {
                answer,
              studentId: userData?.uid,
              studentName: userData?.firstname + ' ' + userData?.lastname,
              time: Timestamp.now(),
            });
      
            setSuccess('Your assignment has been submitted successfully!');
            setSubmitted(true);
          } catch (err) {
            setError('Failed to submit the assignment. Please try again.');
            console.error('Submission error:', err);
          }
    }
    // check if the assignment has been submitted after the submission is successful
    // if it has been submitted, show the success message and remove the subbmit form
    useEffect(() => {
        const checkSubmission = async () => {
        try {
            // Query the submissions collection for existing submissions by the student
        const submissionsRef = collection(db, `Assignments/${id}/submissions`);
        const q = query(submissionsRef, where("studentId", "==", userData?.uid));
        const querySnapshot = await getDocs(q);

        // If a submission exists, set alreadySubmitted to true
        if (!querySnapshot.empty) {
          setSubmitted(true);
        }
        } catch (error) {
            setError('Failed to check submission status. Please try again.');
        }
    };
    checkSubmission();
    }, [submitted])
  return (
    <div>
        <ViewAssignmentDetails />
        <h2>Submit Assignment</h2>
      {success && <p style={{ color: 'green' }}>{success}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    {!submitted ? (
        <form onSubmit={handleSubmit}>
        <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Enter your answer here..."
            rows={10}
            cols={50}
            required
        />
        <br />
        <button onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleSubmit(e)}>Submit</button>
    </form>
    ) : (
        <p>Your assignment has been submitted successfully!</p>
    
    )}
    </div>
  )
}

export default SubmitAssignment