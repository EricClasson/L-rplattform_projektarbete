import "./App.css";
import { Route, Routes } from "react-router-dom";
import Test from "./componets/Test";
import Publish from "./componets/Teacher/Publish/Publish";
import ViewExams from "./componets/Teacher/ViewPublish/ViewExams";
import ViewAssignments from "./componets/Teacher/ViewPublish/ViewAssignments";
import ViewExamsStudent from "./componets/Student/ViewExams/ViewExamsStudent";
import ViewAssignmentsStudent from "./componets/Student/ViewAssingments/ViewAssignmentsStudent";

function App() {
  return (
    <>
      <Routes>
        <Route path="/hello" element={<Test />} />
        <Route path="/Publish" element={<Publish />} />
        <Route path="/GetExamsStudent" element={<ViewExamsStudent />} />
        <Route
          path="/GetAssignmentsStudent"
          element={<ViewAssignmentsStudent />}
        />
        <Route path="/GetAssignmentsTeacher" element={<ViewAssignments />} />
        <Route path="/GetExamsTeacher" element={<ViewExams />} />
      </Routes>
    </>
  );
}

export default App;
