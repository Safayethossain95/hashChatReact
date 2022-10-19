import './App.css'
import Registration from './pages/Registration';
import { Routes, Route, Link } from "react-router-dom";
import Login from './pages/Login';
import Home from './pages/Home';
function App() {
  return (
    <>
      
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
