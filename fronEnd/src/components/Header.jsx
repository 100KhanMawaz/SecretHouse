import React from 'react'
import "../header.scss";
import { useContext } from 'react';
import {Link,useLocation, useNavigate} from "react-router-dom";//Importing location
import NoteContext from './Context/Notes/NoteContext';//Importing context api


export const Header = ({MenuOpen,setMenuOpen}) => {
  var location=useLocation();//using location
  var a=useContext(NoteContext);
  var history=useNavigate();
  var LogOut=(e)=>{
    e.preventDefault();
    localStorage.removeItem('AuthToken');
    history('/login');
    a.showalert("Successfully Logged Out","success")
  }
  return (
    <>
   <nav>
    <NavContent/>

   </nav>
  </>
  )
}

const NavContent=({MenuOpen,setMenuOpen})=>{
  var location=useLocation();//using location
  var a=useContext(NoteContext);
  var history=useNavigate();
  const style={
    margin:"8px 0px 0px 4px",
    color:"white"
  }
  const LogOut=(e)=>{
    e.preventDefault();
    localStorage.removeItem('AuthToken');
    history('/login');
    a.showalert("Successfully Logged Out","success")
  }

  return (
    <>
      <Link className="navbar-brand" to="/"> <h1> Secret House</h1></Link>

    {!localStorage.getItem('AuthToken')?<form className="form my-2 my-lg-0">
    <Link to="/login"><button className="btn login">Login</button></Link>
    <Link to="/signin"><button className="btn signin">Quick SignIN</button></Link>
    </form>:
    <button className="btn" onClick={LogOut}>LogOut</button>}
  
    </>
  );
};
