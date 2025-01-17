import React, { useState } from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "default" });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title , note.description,note.tag); // Pass the note state
    setNote({
      title: "",
      description: "",
      tag: "default"
    });
    props.showAlert("Note Added Successfully", "success");
  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  }

  return (
    <div>
      <div className="container my-3">
        <h1>Your Notebook</h1>
        <form >  {/* Submit handler on form */}
        <div className="mb-3">
            <label htmlFor="title" className="form-label">
                Title
            </label>
            <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                aria-describedby="emailHelp"
                onChange={onChange}
            />
        </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="Tag"
              name="Tag"
              onChange={onChange}
            />
          </div>
          
          <button disabled={note.title.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>
            AddNote
          </button>
        </form>
      </div>
      <h1>Your Notes</h1>
    </div>
  )
}

export default AddNote
 