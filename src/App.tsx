
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
import Logout from "./componets/Logout";
import ViewAssignmentDetails from "./componets/Teacher/ViewPublish/ViewAssignmentDetails";
import { AuthProvider } from "./hooks/useAuth";

function App() {
  return (
    <>
      <Toaster />
      <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<h1>Not Found</h1>} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="/dashboard/Logout" element={<Logout />} />
          <Route
            path="/dashboard/GetExamsStudent"
            element={<ViewExamsStudent />}
          />
          <Route
            path="/dashboard/GetAssignmentsStudent"
            element={<ViewAssignmentsStudent />}
          />
          <Route
            path="/dashboard/GetAssignmentsTeacher"
            element={<ViewAssignments />}
          />
          {/* view assignment details route */}
          <Route path="/dashboard/GetAssignmentsTeacher/:id" element={<ViewAssignmentDetails />} />
          <Route path="/dashboard/GetExamsTeacher" element={<ViewExams />} />
          <Route path="/dashboard/GetStudents" element={<StudentList />} />
        <Route path="/dashboard/Publish" element={<Publish />} />
        </Route>
      </Routes>
       </AuthProvider>
    </>
  );
}

export default App;
