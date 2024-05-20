import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./componets/Login";
import Dashboard from "./componets/Dashboard";
import Register from "./componets/Register";
import { Toaster } from "sonner";
import Publish from "./componets/Teacher/Publish/Publish";
import ViewExams from "./componets/Teacher/ViewPublish/ViewExams";
import ViewAssignments from "./componets/Teacher/ViewPublish/ViewAssignments";
import ViewExamsStudent from "./componets/Student/ViewExams/ViewExamsStudent";
import ViewAssignmentsStudent from "./componets/Student/ViewAssingments/ViewAssignmentsStudent";
import StudentList from "./componets/StudentList/StudentList";

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<h1>Not Found</h1>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Publish" element={<Publish />} />
        <Route path="/GetExamsStudent" element={<ViewExamsStudent />} />
        <Route
          path="/GetAssignmentsStudent"
          element={<ViewAssignmentsStudent />}
        />
        <Route path="/GetAssignmentsTeacher" element={<ViewAssignments />} />
        <Route path="/GetExamsTeacher" element={<ViewExams />} />
        <Route path="/GetStudents" element={<StudentList />} />
      </Routes>
    </>
  );
}

export default App;
