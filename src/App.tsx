import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './componets/Login';
import Dashboard from './componets/Dashboard';
import Register from './componets/Register';
import { Toaster } from 'sonner';
import Publish from './componets/Teacher/Publish/Publish';
import ViewExams from './componets/Teacher/ViewPublish/ViewExams';
import ViewAssignments from './componets/Teacher/ViewPublish/ViewAssignments';
import React, { Suspense } from 'react';
import StudentList from './componets/StudentList/StudentList';
import Logout from './componets/Logout';
import ViewAssignmentDetails from './componets/Teacher/ViewPublish/ViewAssignmentDetails';
import { AuthProvider } from './hooks/useAuth';
import SubmitAssignment from './componets/Student/submissions/SubmitAssignment';
import Loading from './loading';


function App() {
    const ViewSubmissionsComponent = React.lazy(() => import('./componets/Student/submissions/ViewSubmissions'));
    return (
        <>
            <Toaster />
            <AuthProvider>
            <Suspense fallback={<Loading/>}>
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
                        <Route path='/dashboard/ViewSubmissions/:id' element={<ViewSubmissionsComponent />} />
                        <Route path="/dashboard/GetExams" element={<ViewExams />} />
                        <Route path="/dashboard/GetStudents" element={<StudentList />} />
                        <Route path="/dashboard/Publish" element={<Publish />} />
                    </Route>
                </Routes>
            </Suspense>
            </AuthProvider>
        </>
    );
}

export default App;
