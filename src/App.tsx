import { useState } from "react";

import "./App.css";
import { Route, Routes } from "react-router-dom";
import Test from "./componets/Test";

function App() {
  return (
    <>
      <Routes>
        <Route path="/hello" element={<Test />} />
      </Routes>
    </>
  );
}

export default App;
