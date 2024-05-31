import React, { useState, useEffect } from "react";
import { p_assignment, p_exams } from "../../../../firebase";
import { addDoc } from "firebase/firestore";
import "./Publish.css";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
export interface PublishDoc {
  id: "";
  title: string;
  information: string;
  option: string;
  date: string;
  dueDate: string;
}

export default function Publish() {
  const [title, setTitle] = useState<string>("");
  const [information, setInformation] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState("");
  const [dueDateMonth, setDueDateMonth] = useState<string>("");
  const [dueDateDay, setDueDateDay] = useState<string>("");
  const navigate = useNavigate();
  const { userData } = useAuth();
  function onValueChange(e: React.FormEvent<HTMLInputElement>) {
    setSelectedOption(e.currentTarget.value);
  }

  useEffect(() => {
    
    if (!userData) {
      navigate("/");
    }
  }, [userData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dateString = new Date().toISOString();
    const dueDate = `${dueDateMonth} ${dueDateDay}`;
    const data: PublishDoc = {
      id: "", // Assuming you have a unique ID generator or Firestore will generate it
      title: title,
      information: information,
      option: selectedOption,
      date: dateString,
      dueDate: dueDate,
    };
    try {
      if (selectedOption === "Exam") {
        await addDoc(p_exams, data);
      } else {
        await addDoc(p_assignment, data);
      }
      setTitle("");
      setInformation("");
      setSelectedOption("");
      setDueDateMonth("");
      setDueDateDay("");
      toast("Successfully published!", {
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
    } catch (error) {
      toast("Error publishing!! Try again!", {
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

  return (
    <div>
      <div className="rounded-g bg-white p-8 lg:col-span-3 lg:p-12 text-center">
        <div className="instructions">
          <p>
            Please fill out the form below to publish a new assignment or exam.
            Make sure to provide all the necessary information and select the
            correct type.<br></br>
            Title: Enter a clear title for your assignment or exam.<br></br>
            Type: Choose "Assignment" or "Exam" from the options provided.
            <br></br>
            Instructions: Write detailed guidelines and any necessary resources
            for students.<br></br>
            Selec the month and day for the due date <br></br>
            Submission: Click "Submit" to publish your assignment or exam.
          </p>
        </div>
        <form action="#" className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="sr-only" htmlFor="Title">
              Title
            </label>
            <input
              className="w-full rounded-lg border-gray-200 p-3 text-sm"
              placeholder="Title"
              type="text"
              id="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-2">
            <div>
              <label
                htmlFor="Assignments"
                className="block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white"
                tabIndex={0}
              >
                <input
                  className="sr-only"
                  id="Assignments"
                  type="radio"
                  tabIndex={-1}
                  name="Assignments"
                  value="Assignment"
                  checked={selectedOption === "Assignment"}
                  onChange={onValueChange}
                />

                <span className="text-sm"> Assignments </span>
              </label>
            </div>

            <div>
              <label
                htmlFor="exam"
                className="block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white"
                tabIndex={0}
              >
                <input
                  className="sr-only"
                  id="exam"
                  type="radio"
                  tabIndex={-1}
                  name="exam"
                  value="Exam"
                  checked={selectedOption === "Exam"}
                  onChange={onValueChange}
                />

                <span className="text-sm"> Exam </span>
              </label>
            </div>
          </div>

          <div>
            <label className="sr-only" htmlFor="Information">
              Information
            </label>
            <textarea
              className="w-full rounded-lg border-gray-200 p-3 text-sm"
              placeholder="Information"
              rows={8}
              id="Information"
              value={information}
              onChange={(e) => setInformation(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <span className="text-sm">
              {selectedOption === "Exam" ? "Date" : "Deadline"} (Month)
            </span>
            <span className="text-sm">
              {selectedOption === "Exam" ? "Date" : "Deadline"} (Day)
            </span>
            <div>
              <select
                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                id="DueDateMonth"
                onChange={(e) => setDueDateMonth(e.target.value)}
                value={dueDateMonth}
                required
              >
                <option value="">Select Month</option>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </select>
            </div>

            <div>
              <select
                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                id="DueDateDay"
                onChange={(e) => setDueDateDay(e.target.value)}
                value={dueDateDay}
                required
              >
                <option value="">Select Day</option>
                {[...Array(31)].map((_, index) => (
                  <option key={index + 1} value={(index + 1).toString()}>
                    {index + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="buttonGreen inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
            >
              Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
