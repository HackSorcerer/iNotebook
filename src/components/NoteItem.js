import React from "react";
import noteContext from "../context/notes/noteContext";
import { useContext } from "react";

const NoteItem = (props) => {
  
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note,updateNote } = props;
  return (
    <div className="col-md-3">
      
      <div className="card my-3"> 
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">
          {note.description}
          </p>
          <i className="fa-solid fa-trash mx-2" onClick={() => {
    if (window.confirm("Are you sure you want to delete this note?")) {
        try {
            deleteNote(note._id);
            props.showAlert("Note deleted successfully!", "success");
        } catch (error) {
            console.error("Error deleting note:", error);
            props.showAlert("Failed to delete note. Please try again.", "error");
        }
    }
}}></i>
<i className="fa-solid fa-pencil mx-2" onClick={() => {
    updateNote(note); // Assuming this handles any necessary alerts itself
}}></i>

        </div>
      </div>
    </div>
  );
};

export default NoteItem;
