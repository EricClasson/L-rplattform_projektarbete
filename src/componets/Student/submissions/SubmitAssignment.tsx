import { useState } from 'react';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db, auth, usersCollection } from '../firebaseConfig';
const SubmitAssignment = () => {
    const [answer, setAnswer] = useState<string>('')
    const [success, setSuccess] = useState<string>("")
    const [error, setError] = useState<string>("")
    const user = auth.currentUser
  return (
    <div>
        <h2>Submit Assignment</h2>
      {success && <p style={{ color: 'green' }}>{success}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
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
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default SubmitAssignment