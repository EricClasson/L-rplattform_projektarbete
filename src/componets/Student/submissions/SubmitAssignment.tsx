import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  getDocs,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { db } from "../../../../firebase";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate, useParams } from "react-router-dom";
import ViewAssignmentDetails from "../../Teacher/ViewPublish/ViewAssignmentDetails";
import { toast } from "sonner";

const SubmitAssignment = () => {
  const [answer, setAnswer] = useState<string>("");
  const navigate = useNavigate();

  const [error, setError] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const { userData } = useAuth();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!userData ) {
      navigate("/");
    }
  }, [userData, id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, `Assignments/${id}/submissions`), {
        answer,
        studentId: userData?.uid,
        studentName: userData?.firstname + " " + userData?.lastname,
        time: Timestamp.now(),
      });

      setSubmitted(true);
      toast("Your assignment has been submitted successfully!", {
        className: "bg-green-100 flex items-center",
        duration: 5000,
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        ),
        position: "top-right",
      });
    } catch (err) {
      setError("Failed to submit the assignment. Please try again.");
      toast("Failed to submit the assignment. Please try again.", {
        className: "bg-red-100 flex items-center",
        duration: 5000,
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21 3 3M21 3 3 21"
            />
          </svg>
        ),
        position: "top-right",
      });
    }
  };
  // check if the assignment has been submitted after the submission is successful
  // if it has been submitted, show the success message and remove the subbmit form
  useEffect(() => {
    const checkSubmission = async () => {
      try {
        // Query the submissions collection for existing submissions by the student
        const submissionsRef = collection(db, `Assignments/${id}/submissions`);
        const q = query(
          submissionsRef,
          where("studentId", "==", userData?.uid)
        );
        const querySnapshot = await getDocs(q);

        // If a submission exists, set alreadySubmitted to true
        if (!querySnapshot.empty) {
          setSubmitted(true);
        }
      } catch (error) {
        setError("Failed to check submission status. Please try again.");
      }
    };
    checkSubmission();
  }, [submitted]);
  return (
    <div className="w-full flex justify-center">
      <div className="p-8 bg-white border shadow-md rounded-md flex flex-col gap-4 min-w-[70vmin]">
        <ViewAssignmentDetails />

        <h2 className="text-zinc-900 font-bold">Submit Assignment</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              <textarea
                className="border min-w-[70vmin] p-4"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Enter your answer here..."
                rows={5}
                required
              />
              <button className="button border" type="submit">
                Submit
              </button>
            </div>
          </form>
        ) : (
          <p className="text-green-700">
            Your assignment has been submitted successfully!
          </p>
        )}
      </div>
    </div>
  );
};

export default SubmitAssignment;
