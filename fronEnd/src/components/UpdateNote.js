import React from 'react'

const UpdateNote = () => {
  return (
    // <!-- Vertically centered modal -->
<div class="modal-dialog modal-dialog-centered">
<form >
  <div className="form-group">
    <label htmlFor="title">Title</label>
    <input type="text" className="form-control" id="title" name="title"  aria-describedby="emailHelp" placeholder='Enter Title of your note'/>
  </div>
  <div className="form-group">
    <label htmlFor="description">Description</label>
    <input type="text" className="form-control" id="description"  name="description"  placeholder='Enter Description of your note'/>
  </div>
  <div className="form-group">
    <label htmlFor="tag">tag</label>
    <input type="text" className="form-control" id="tag"  name="tag"  placeholder='Enter tag of your note'/>
  </div>
  <button type="submit" className="btn btn-primary">Add Note</button>
</form>
</div>

  )
}

export default UpdateNote