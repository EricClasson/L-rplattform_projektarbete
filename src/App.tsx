import { useState } from "react";

import "./App.css";
import { Route, Routes } from "react-router-dom";
import Test from "./componets/Test";
import Assignment from "./componets/Teacher/Publish/Publish";

function App() {
  return (
    <>
      <Routes>
        <Route path="/hello" element={<Test />} />
        <Route path="/Assignment" element={<Assignment />} />
      </Routes>
    </>
  );
}

export default App;
