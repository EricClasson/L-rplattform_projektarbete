import { useState } from "react";

import "./App.css";
import { Route, Routes } from "react-router-dom";
import Test from "./componets/Test";
import Publish from "./componets/Teacher/Publish/Publish";
import Student from "./componets/Student/Student";
import ViewPublish from "./componets/Teacher/Publish/ViewPublish";

function App() {
  return (
    <>
      <Routes>
        <Route path="/hello" element={<Test />} />
        <Route path="/Assignment" element={<Publish />} />
        <Route path="/GetAssignmentStudent" element={<Student />} />
        <Route path="/GetAssignmentTeacher" element={<ViewPublish />} />
      </Routes>
    </>
  );
}

export default App;
