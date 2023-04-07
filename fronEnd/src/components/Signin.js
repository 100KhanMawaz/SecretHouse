import React,{useState,useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import NoteContext from './Context/Notes/NoteContext';
import Contacts from '../components/Contacts';
import '../contact.scss';
import toast  from 'react-hot-toast'
import {motion} from 'framer-motion'

const Signin = () => {
  const context = useContext(NoteContext);
  const {showalert}=context;
  let history=useNavigate();
  const [Credentials, setCredentials] = useState({name:"",email:"",password:"",confirmPassword:""})
  const submit=async(e)=>{
    e.preventDefault();
      //Adding a note on server side
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(Credentials) // body data type must match "Content-Type" header matlab jaise body k andar likha hai waisa hi likha hona chaiye same order mein mein
        });
        const json=await response.json();
        if(json.success)
        {
          history('/login');
          localStorage.setItem('AuthToken',json.AuthToken);
          showalert("Successfully Signed In",'success');
        }
        else{
          showalert(json.errors,'danger');
        }
  }
  const onChange=(e)=>{
    setCredentials({...Credentials,[e.target.name]:e.target.value})
  }
  const animations={
    form:{
      initial:{
        x:"-100%",
        opacity:0
      },
      whileInView:{
        x:0,
        opacity:1
      }
    },
    button:{
      initial:{
        y:"-100%",
        opacity:0
      },
      whileInView:{
        y:0,
        opacity:1
      },
      transition:{
        delay:0.5,
    }
  }
  }  
  return (
    <div className="container mt-5">
       <motion.form onSubmit={submit} {...animations.form}>
           
            <input type="text" required name="name" value={Credentials.name} onChange={onChange} id="name" aria-describedby="emailHelp" placeholder='Enter Username'/> 
           
            <input type="email"  required name="email" value={Credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter Email'/>
           
            <input type="password"  required name="password" value={Credentials.password} onChange={onChange} id="exampleInputPassword1" placeholder='Enter Password'/>
           
            <input type="password" required name="confirmPassword" value={Credentials.confirmPassword} onChange={onChange} id="confirmPassword" placeholder='Re-Enter Confirm Password'/>
          
          <motion.button {...animations.button} type="submit" className="btn">Sign In</motion.button>
        </motion.form>
    </div>
  )
}

export default Signin