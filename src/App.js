import './App.css'
import React,{useEffect,useState} from 'react'
import Registration from './pages/Registration';
import { Routes, Route, Link } from "react-router-dom";
import Login from './pages/Login';
import Home from './pages/Home';
import {BsToggleOn,BsToggleOff} from 'react-icons/bs'
function App() {
  const [dl,setDl] = useState(false)
  const handledarkmode = ()=>{
    setDl(!dl)
  }
  return (
    <>
      <div className={dl?"light":"dark"}>
        <div className="switch" onClick={handledarkmode}>
          {
            dl
            ?
            <span className='off'><BsToggleOff/></span>
            :
            <span className='on'><BsToggleOn/></span>
          }
        
        </div>
        <Routes>
          <Route path="/" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>

      </div>
    </>
  );
}

export default App;
