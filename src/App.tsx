import "./App.css";
import { Route, Routes } from "react-router-dom";
import Test from "./componets/Test";
import Login from "./componets/Login";
import Dashboard from "./componets/Dashboard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/hello" element={<Test />} />
        <Route path="/" element={<Login/>} />
        <Route path="*" element={<h1>Not Found</h1>} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </>
  );
}

export default App;
