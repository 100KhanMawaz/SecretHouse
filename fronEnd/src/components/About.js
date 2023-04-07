//Difference between rafc and rafce is that rafce which is used here is an arrow function which exports the function explicitely
import React,{useContext,useEffect} from 'react'
import NoteContext from './Context/Notes/NoteContext'
const About = () => {
  // const a=useContext(NoteContext)
  // useEffect(() => {
  // a.update();
  // }, [])
  
  return (
    <div>This is About</div>
   // <div>This is {a.state.name} in class {a.state.class} </div>
  )
}

export default About