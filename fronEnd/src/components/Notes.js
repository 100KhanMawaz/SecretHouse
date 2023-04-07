import React,{useContext,useState,useRef} from 'react'
import NoteContext from './Context/Notes/NoteContext'
import {NoteItem} from './NoteItem'
const Notes = () => {
  const context=useContext(NoteContext);
  const {notes,updateNote}=context;
  const [note, setnote] = useState({eid:"",etitle:"",edescription:"",etag:""})
  const refOpen= useRef(null)
  const refClose= useRef(null)
  const update=(currentnote)=>{
      refOpen.current.click();
      setnote({eid:currentnote._id,etitle:currentnote.title,edescription:currentnote.description,etag:currentnote.tag})
  }
  const handleChange=(e)=>{
    setnote({...note,[e.target.name]:e.target.value})
  }
  const submit=()=>{
    console.log("Updating note is ",note)
    updateNote(note);
    refClose.current.click();
    setnote({eid:"",etitle:"",edescription:"",etag:""})
  }
  return (
    <>
    <button type="button" className="btn btn-primary d-none" ref={refOpen} data-toggle="modal" data-target="#exampleModal">
  Launch demo modal
</button>
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        {/* Modal Form for update */}
      <form >
        <div className="form-group">
          <label htmlFor="etitle">Title</label>
          <input type="text" className="form-control" id="etitle" value={note.etitle} name="etitle" onChange={handleChange} aria-describedby="emailHelp" placeholder='Enter Title of your note'/>
        </div>
        <div className="form-group">
          <label htmlFor="edescription">Description</label>
          <input type="text" className="form-control" id="edescription" value={note.edescription} name="edescription" onChange={handleChange} placeholder='Enter Description of your note'/>
        </div>
        <div className="form-group">
          <label htmlFor="etag">tag</label>
          <input type="text" className="form-control" id="etag" value={note.etag} name="etag" onChange={handleChange} placeholder='Enter tag of your note'/>
        </div>
      </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal" ref={refClose}>Close</button>
        <button type="button" className="btn btn-primary" disabled={note.etitle.length<3||note.edescription.length<5} onClick={submit}>Update Note</button>
      </div>
    </div>
  </div>
</div>                              {/* Neeche jo && hai wo tab use karte hai jab apne pass if else statment mein else kch bhi na ho to! */}
    <h3 className="text-danger">{notes.length===0 && 'Your notes will appear here'}</h3>
    <div className='d-flex flex-wrap'>
         {
          notes.map((note,index)=>{
            return <NoteItem key={index} note={note} update={update}/>
          })
         }
    </div>
    </>
  )
}

export default Notes