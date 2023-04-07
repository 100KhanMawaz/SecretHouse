import React,{useState,useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import NoteContext from './Context/Notes/NoteContext';
import '../contact.scss';
import toast  from 'react-hot-toast';
import {motion} from 'framer-motion';

const Login = () => {
  const context = useContext(NoteContext)
  const {showalert}=context;
    let history=useNavigate();
    const [Credentials, setCredentials] = useState({email:"",password:""})
    const submit=async(e)=>{
        e.preventDefault();
            const response = await fetch(`http://localhost:5000/api/auth/login`, {
             method: 'POST',
             headers: {
               'Content-Type': 'application/json',
             },
             body: JSON.stringify({email:Credentials.email,password:Credentials.password}) // body data type must match "Content-Type" header matlab jaise body k andar likha hai waisa hi likha hona chaiye same order mein mein
           });
           const json= await response.json(); // parses JSON response into native JavaScript objects
           if(json.success)
           {
            console.log(json.AuthToken);
            localStorage.setItem('AuthToken',json.AuthToken);
            history('/');
            showalert("Successfully Loged In","success")
           }
           else{
            //alert();
            showalert(json.errors,"danger")
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
   <input type="email" placeholder='Enter-Email' required name="email" value={Credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <input type="password" placeholder='Enter-Password' required name="password" value={Credentials.password} onChange={onChange} id="exampleInputPassword1"/>
  <motion.button {...animations.button} type="submit" className="btn">LogIn</motion.button>
</motion.form>
    </div>
  )
}

export default Login