import React,{useState} from 'react'
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbaar from './components/Navbaar';
import About from './components/About';
import { Home } from './components/Home';
import NoteState from './components/Context/Notes/NotesState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signin from './components/Signin';
import {Header,PhoneHeader} from './components/Header';
import Read from './components/Read';


function App() {

  const [MenuOpen, setMenuOpen] = useState(false)
  return (
    <>
    <NoteState>
    <Router>
   <Header MenuOpen={MenuOpen} setMenuOpen={setMenuOpen}/>
   
    <Alert/>
    <div className="container">
     <Routes>
     <Route path="/" element={<Home />}/>
     <Route path="/about" element={<About/>}/>
     <Route path='/login' element={<Login />}/>
     <Route path='/signin' element={<Signin/>}/>
     <Route path='/read' element={<Read/>}/>
     </Routes>
     </div>
    </Router>
    </NoteState>
    </>
  );
}

export default App;
