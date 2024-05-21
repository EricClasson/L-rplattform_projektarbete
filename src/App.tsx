import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './componets/Login';
import Dashboard from './componets/Dashboard';
import Register from './componets/Register';
import { Toaster } from 'sonner';
import Publish from './componets/Teacher/Publish/Publish';
import ViewExams from './componets/Teacher/ViewPublish/ViewExams';
import ViewAssignments from './componets/Teacher/ViewPublish/ViewAssignments';
import ViewExamsStudent from './componets/Student/ViewExams/ViewExamsStudent';
import ViewAssignmentsStudent from './componets/Student/ViewAssingments/ViewAssignmentsStudent';
// import AddStudentRelationship from './componets/Teacher/AddStudentRelationship';
import Logout from './componets/Logout';

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
                <Route path="/Logout" element={<Logout />} />
                {/* <Route path="/studentrelationship" element={<AddStudentRelationship />} /> */}
                <Route path="/GetExamsStudent" element={<ViewExamsStudent />} />
                <Route path="/GetAssignmentsStudent" element={<ViewAssignmentsStudent />} />
                <Route path="/GetAssignmentsTeacher" element={<ViewAssignments />} />
                <Route path="/GetExamsTeacher" element={<ViewExams />} />
            </Routes>
        </>
    );
}

export default App;
