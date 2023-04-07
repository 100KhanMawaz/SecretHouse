import React,{useState/*,useEffect*/} from "react";
import NoteContext from "./NoteContext";

const NoteState=(props)=>{
  const url="http://localhost:5000";
    const notesInitial=[ ]
          const [notes, setnotes] = useState(notesInitial);
    //Below code was just for example explanation and for fun

    // const s1={
    //     name:"Mawaz",
    //     class:14
    //    }
    // const [state, setstate] = useState(s1);
    const [time, settime] = useState(Date());
    // const update=()=>{
    //     setTimeout(() => {
    //         setstate({
    //             name:"Khan",
    //             class:24
    //         })
    //     }, 2000);
    // }
  const [alert, setalert] = useState(null);
  const showalert=(message,type)=>{
    setalert({
      message:message,
      type:type
    })
    setTimeout(() => {
      setalert(null);
    }, 2000);
  }
     const Time=()=>{
         setInterval(() => {
             settime(Date());
         }, 1000);
     }
     //Fetch All Notes
     const getnotes=async()=>{
     const response = await fetch(`${url}/api/notes/fetchallnotes`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      headers: {
        'auth-token': localStorage.getItem('AuthToken')
      },
    });  
    const json= await response.json(); // parses JSON response into native JavaScript objects
    setnotes(json);
  }
     
     //Add a note
     const addNote=async(title,description,tag)=>{
    //Adding a note on server side
      const response = await fetch(`${url}/api/notes/addnote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token':localStorage.getItem('AuthToken')
        },
        body: JSON.stringify({title,description,tag}) // body data type must match "Content-Type" header matlab jaise body k andar likha hai waisa hi likha hona chaiye same order mein mein
      });
      const json= await response.json(); // parses JSON response into native JavaScript objects
      setnotes(notes.concat(json))
      //Adding a note on client side
     }
     const deleteNote=async(id)=>{
     //Deleting in server side
      const response = await fetch(`${url}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type':'application/json',
        'auth-token':localStorage.getItem('AuthToken')
      }
    });
    const json= await response.json(); // parses JSON response into native JavaScript objects

     //Delete a Note in client site
        setnotes(notes.filter((note)=>{
            return note._id!==id
        }))
        //Above filter function rejects the note._id satisfying condition note._id!==id and rest all the notes will be returned and a new array is formed we should have took that new array in a variable but still i am using setnotes directly
        showalert("Successfully Deleted","success");
      }

     const updateNote=async(note)=>{
     const response = await fetch(`${url}/api/notes/updatenote/${note.eid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('AuthToken')
      },
      body: JSON.stringify({title:note.etitle,description:note.edescription,tag:note.etag}) // body data type must match "Content-Type" header matlab jaise body k andar likha hai waisa hi likha hona chaiye same order mein mein
    });
    const json= await response.json(); // parses JSON response into native JavaScript objects
     //Editing note in client site
        console.log("Mai update hu dobara")
       for (let index = 0; index < notes.length; index++) {
        const element = notes[index];
            if(element._id===note.eid)
            {
              element.title=note.etitle;
              element.description=note.edescription;
              element.tag=note.etag;   
            }
        }
        showalert("Successfully Updated","warning");
     }
    return(
    <NoteContext.Provider value={{notes,setnotes,time,Time,addNote,deleteNote,getnotes,updateNote,alert,showalert}}>
        {props.children}
    </NoteContext.Provider>
    )
}
export default NoteState;
 