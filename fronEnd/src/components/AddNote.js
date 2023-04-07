import React,{useState,useContext} from 'react'
import NoteContext from './Context/Notes/NoteContext'
import toast  from 'react-hot-toast'
import {motion} from 'framer-motion'
import '../contact.scss';

const AddNote = () => {
    const context = useContext(NoteContext);
   const {addNote,showalert}=context;
   const [NewNote, setNewNote] = useState({title:"",description:"",tag:""})
    const handleClick=(e)=>{
        setNewNote({...NewNote,[e.target.name]:e.target.value})
    }
    const submit=(e)=>{
        e.preventDefault();
        addNote(NewNote.title,NewNote.description,NewNote.tag)
        setNewNote({title:"",description:"",tag:""})
        showalert("Note Added SuccessFully","primary");
      }
      // const mystyle={
      //   justifyContent: "start !important",
      // };
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
    <>
    <h1 className='AddNote'>Add Note</h1>
      <motion.form onSubmit={submit} {...animations.form} style={{alignItems: 'start',}}>
    <input type="text" id="title" required minLength={3} value={NewNote.title} style={{width: '80%',}} name="title" onChange={handleClick} aria-describedby="emailHelp" placeholder='Enter Title of your note'/>

    <input type="text" id="tag" required value={NewNote.tag} name="tag"  onChange={handleClick} style={{width: '80%',}} placeholder='Enter tag of your note'/>

    <textarea type="text" id="description" required minLength={5} value={NewNote.description} style={{width: '80%',}} name="description" onChange={handleClick} placeholder='Enter Description of your note'/>

    <motion.button {...animations.button} type="submit" className="btn">Add Note</motion.button>

    </motion.form>
      <h1 className='my-3'>Your Notes</h1>
      <div className="d-flex flex-wrap">
   </div>
   </>
  )
}

export default AddNote