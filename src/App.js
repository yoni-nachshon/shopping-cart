import React from "react";
import { Routes, Route } from "react-router-dom";
import './App.css';
import Shop from "./components/Shop";

function App() {

  return (
    <>          
        <Routes>
          <Route path="/" exact element={<Shop />} />
        </Routes>     
    </>
  );
}
export default App;
