import React, { useState } from "react";
import { p_assignment, p_exams } from "../../../../firebase";
import { addDoc } from "firebase/firestore";

export interface PublishDoc {
  id: "";
  title: string;
  information: string;
  option: string;
  date: string;
}

export default function Publish() {
  const [title, setTitle] = useState<string>("");
  const [information, setInformation] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState("");

  function onValueChange(e: React.FormEvent<HTMLInputElement>) {
    // Updating the state with the selected radio button's value
    setSelectedOption(e.target.value);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const dateString = new Date().toISOString();
    const data: PublishDoc = {
      title: title,
      information: information,
      option: selectedOption,
      date: dateString,
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
      console.log("Document successfully written!");
    } catch (error) {
      console.error("Error writing document: ", error);
    }
  };

  return (
    <div>
      <div className="rounded-lg bg-white p-8 lg:col-span-3 lg:p-12">
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
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-2">
            <div>
              <label
                htmlFor="Assignments"
                className="block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white"
                tabIndex="0"
              >
                <input
                  className="sr-only"
                  id="Assignments"
                  type="radio"
                  tabIndex="-1"
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
                tabIndex="0"
              >
                <input
                  className="sr-only"
                  id="exam"
                  type="radio"
                  tabIndex="-1"
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
              rows="8"
              id="Information"
              onChange={(e) => setInformation(e.target.value)}
            ></textarea>
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
