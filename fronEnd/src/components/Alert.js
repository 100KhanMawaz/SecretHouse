import React,{useContext} from 'react'
import NoteContext from './Context/Notes/NoteContext'
const Alert = () => {
  const context = useContext(NoteContext)
  const {alert}=context;
  return (
    
    alert && <div class={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
      <strong>{alert.message }</strong> 
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>

  )
}

export default Alert