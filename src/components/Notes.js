
import React, { useContext, useEffect, useState, useRef } from "react";
import {useNavigate} from 'react-router-dom';
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";

const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;

  const navigate = useNavigate(null);

  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }else{
      navigate('/login');
    }
  }, []);

  const [note, setNote] = useState({eid:"", etitle:"", edescription:"", etag:""});

  const ref = useRef(null);
  const refClose = useRef(null);

  const updateNote = (currentNote)=>{
    ref.current.click();
    setNote({eid: currentNote._id, etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag});
  }
  
  const handleClick = (e)=>{
    e.preventDefault();
    refClose.current.click();
    editNote(note.eid, note.etitle, note.edescription, note.etag);
  }

  const onChange = (e)=>{
      setNote({...note, [e.target.name]: e.target.value});
  }

  return (
    <>
      <AddNote/>

      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Update Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
            <form>
          <div className="mb-3">
            <label htmlFor="etitle" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="etitle"
              name="etitle"
              aria-describedby="emailHelp"
              value={note.etitle}
              onChange={onChange}
              minLength={5}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="edescription" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="edescription"
              name="edescription"
              value={note.edescription}
              onChange={onChange}
              minLength={5}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="etag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="etag"
              name="etag"
              value={note.etag}
              onChange={onChange}
              minLength={5}
              required
            />
          </div>
        </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button disabled={note.etitle.length < 5 || note.edescription.length <5} type="button" className="btn btn-primary" onClick={handleClick}>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3 gap-2">
        <h2>Your notes</h2>
        <div className="container">
        {notes.length === 0 && "No notes to display"}
        </div>
        {Array.isArray(notes) && notes.map((note, index) => {
    return <NoteItem key={index} updateNote={updateNote} note={note} />;
})}

      </div>
    </>
  );
};

export default Notes;
