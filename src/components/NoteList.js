import React, { useState } from "react";

const NoteList = ({ date, notes, addNote, editNote, deleteNote }) => {
  const [newNote, setNewNote] = useState("");

  const handleAddNote = () => {
    if (newNote.trim() !== "") {
      addNote(newNote);
      setNewNote("");
    }
  };

  return (
    <div className="note-list">
      <h3>Нотатки на {date.toLocaleDateString()}</h3>
      <ul>
        {notes && notes.length > 0 ? (
          notes.map((note, index) => (
            <li key={index}>
              <input
                type="text"
                value={note.text}
                onChange={(e) => editNote(e.target.value, index)}
              />
              <button onClick={() => deleteNote(index)}>Видалити</button>
            </li>
          ))
        ) : (
          <li>Нотатків немає</li> // Якщо нотатків немає
        )}
      </ul>
      <input
        type="text"
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
        placeholder="Додати нотатку"
      />
      <button onClick={handleAddNote}>Додати</button>
    </div>
  );
};

export default NoteList;
