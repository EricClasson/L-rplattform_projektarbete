import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './componets/Login';
import Dashboard from './componets/Dashboard';
import Register from './componets/Register';
import { Toaster } from 'sonner';
import Publish from './componets/Teacher/Publish/Publish';
import ViewExams from './componets/Teacher/ViewPublish/ViewExams';
import ViewAssignments from './componets/Teacher/ViewPublish/ViewAssignments';


import StudentList from './componets/StudentList/StudentList';
import Logout from './componets/Logout';
import ViewAssignmentDetails from './componets/Teacher/ViewPublish/ViewAssignmentDetails';
import { AuthProvider } from './hooks/useAuth';
import SubmitAssignment from './componets/Student/submissions/SubmitAssignment';
import ViewSubmissions from './componets/Student/submissions/ViewSubmissions';

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
                            path="/dashboard/GetAssignments"
                            element={<ViewAssignments />}
                        />
                        {/* view assignment details route */}
                        <Route
                            path="/dashboard/GetAssignments/:id"
                            element={<ViewAssignmentDetails />}
                        />
                        <Route
                            path="/dashboard/SubmitAssignment/:id"
                            element={<SubmitAssignment />}
                        />
                        <Route path='/dashboard/ViewSubmissions/:id' element={<ViewSubmissions />} />
                        <Route path="/dashboard/GetExams" element={<ViewExams />} />
                        <Route path="/dashboard/GetStudents" element={<StudentList />} />
                        <Route path="/dashboard/Publish" element={<Publish />} />
                    </Route>
                </Routes>
            </AuthProvider>
        </>
    );
}

export default App;
