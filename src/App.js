
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alert from './components/Alert';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { useState } from 'react';



function App() {
   const [alert, setAlert] = useState(null)
   const showAlert=(message, type)=>{
    setAlert({
      msg:message,
      type:type
    })
     setTimeout(() => {
      setAlert(null)
     }, 2000);
   }
  return (  
  <>
  <NoteState>
    <BrowserRouter>
      <Navbar />
      <Alert alert={alert}/>  
      <div className="container">
      <Routes>
        <Route exact path="/" element={<Home showAlert={showAlert}/>}></Route>
        <Route exact path="/about" element={<About showAlert={showAlert}/>}></Route>
        <Route exact path="/login" element={<Login showAlert={showAlert}/>}></Route>      
        <Route exact path="/signup" element={<SignUp showAlert={showAlert}/>}></Route>      
        {/* <Route exact path="/Signup" element={<SignUp/>}></Route>       */}
      </Routes>
      </div>
    </BrowserRouter>
    
    </NoteState>
  </>
  );
}

export default App;