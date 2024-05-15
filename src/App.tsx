import './App.css';
import { Route, Routes } from 'react-router-dom';
import Test from './componets/Test';
import Login from './componets/Login';
import Dashboard from './componets/Dashboard';
import Register from './componets/Register';
import { Toaster } from 'sonner';

function App() {
    return (
        <>
            <Toaster />
            <Routes>
                <Route path="/hello" element={<Test />} />
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<h1>Not Found</h1>} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </>
    );
}

export default App;
