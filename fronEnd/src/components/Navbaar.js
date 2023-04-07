//Difference between rafc and rafce is that rafce which is used here is an arrow function which exports the function explicitely

import React from 'react'
import { useContext } from 'react';
import {Link,useLocation, useNavigate} from "react-router-dom";//Importing location
import NoteContext from './Context/Notes/NoteContext';//Importing context api
const Navbaar = () => {
  let location=useLocation();//using location
 // useEffect(() => {
   // console.log(location.pathname);
//  }, [location]);
  //In the above code useEffect will be executed as many times location is changed and the location is changed when path is changed in the url
  const style={
    margin:"8px 0px 0px 4px",
    color:"white"
  }
  const a=useContext(NoteContext);
  const history=useNavigate();
  const LogOut=(e)=>{
    e.preventDefault();
    localStorage.removeItem('AuthToken');
    history('/login');
    a.showalert("Successfully Logged Out","success")
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <Link className="navbar-brand" to="/">Secret House</Link>
  

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <Link className={`nav-link ${location.pathname === '/'?'active':''}`} to="/" >Home <span className="sr-only">(current)</span></Link>
      </li>
      <li className="nav-item">
        <Link className={`nav-link ${location.pathname === '/about'?'active':''}`} to="/about">about</Link>
      </li>
      <li id="time" style={style}>{a.time} {a.Time()}</li>
     
    </ul> 
    {!localStorage.getItem('AuthToken')?<form className="form-inline my-2 my-lg-0">
    <Link to="/login"><button className="btn btn-outline-primary my-2 my-sm-0 mx-1">Login</button></Link>
    <Link to="/signin"><button className="btn btn-outline-primary my-2 my-sm-0 mx-2">Quick SignIN</button></Link>
    </form>:
    <button className="btn btn-outline-primary my-2 my-sm-0 mx-2" onClick={LogOut}>LogOut</button>}
  </div>
</nav>
  )
}

export default Navbaar