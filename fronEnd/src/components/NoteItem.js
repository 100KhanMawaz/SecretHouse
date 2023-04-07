import React,{useContext} from 'react';
import { Link } from 'react-router-dom';
import NoteContext from './Context/Notes/NoteContext';
//import UpdateNote from './UpdateNote';

export const NoteItem = (props) => {
  const {note,update}=props;
  const context = useContext(NoteContext)
  return (
    <>
    
  <div className="card my-3 col-md-5 mx-3 ">
  <div className="card-body">
    <h5 className="card-title">{note.title}</h5>
    <p className="card-text">{note.description}</p>
    <Link to="/" className="card-link"><i className="fa-solid fa-trash-can" onClick={()=>context.deleteNote(note._id)/*So here's mess since i don't know why call back function is being used here one of the reason i can guess is because we are passiing argumnets to this function call so that's y still it's not clear */}></i></Link>
    <Link to="/" className="card-link"><i className="fa-solid fa-file-pen" onClick={()=>update(note)}/*data-toggle="modal" data-target="#exampleModal" we can also call the modal by writing these classess but we have to pass the existing credentials like title or description so know we will use an arrow function and call a function within that arrow function and pass a note{or title ,desc and tag} in that nested function*/ ></i></Link>
  </div>
</div>
</>
  )
}
