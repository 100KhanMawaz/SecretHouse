//Difference between rafc and rafce is that rafce which is used here is an arrow function which exports the function within the arrow function
import React,{useContext,useEffect} from 'react'
import NoteContext from './Context/Notes/NoteContext'
import AddNote from './AddNote';
import Notes from './Notes';
import { useNavigate } from 'react-router-dom';
export const Home = () => {
  let history=useNavigate();
  const context=useContext(NoteContext);
    const {getnotes}=context;
    useEffect(() => {
      if(localStorage.getItem('AuthToken'))
      getnotes();
      else{
        history('/login');
      }
      // eslint-disable-next-line
     }, [])
  return (
    <>
    <div className="container my-3">
    <AddNote />
   <Notes/>
    </div>
    </>
  )
}
