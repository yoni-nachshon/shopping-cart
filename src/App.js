import React from "react";
import { Routes, Route } from "react-router-dom";
import './App.css';
import Shop from "./components/Shop/Shop";


function App() {
  return (
    <>         
        <div style={{textAlign:'center',marginTop:'1rem'}}>
        {/* <Link to='/' style={{ color: 'inherit', textDecoration: 'none' }}>Store</Link> */}
        </div>    
        <Routes>
          <Route path="/" exact element={<Shop />} />
        </Routes>     
    </>
  );
}

export default App;
