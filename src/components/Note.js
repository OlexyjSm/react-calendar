import React, { useState } from "react";

const Note = ({ note, onDelete, onEdit }) => {
  if (!note) return null; // Додаємо обробку для undefined

  const [isEditing, setIsEditing] = useState(false);
  const [newNote, setNewNote] = useState(note.text);
  const [isImportant, setIsImportant] = useState(note.isImportant || false); // Додаємо стан для важливої нотатки

  const handleEdit = () => {
    if (isEditing) {
      onEdit(note.id, newNote);
    }
    setIsEditing(!isEditing);
  };

  const toggleImportant = () => {
    setIsImportant(!isImportant);
  };

  return (
    <div
      className={`note ${isImportant ? "important" : ""}`}
      style={{ display: "flex", alignItems: "flex-start", flexWrap: "wrap" }}
    >
      {isEditing ? (
        <textarea
          rows="3" // Встановлюємо кількість рядків
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          style={{ width: "100%", resize: "none", marginRight: "10px" }} // Додаємо ширину та забороняємо зміну розміру
        />
      ) : (
        <span
          style={{
            flexGrow: 1,
            whiteSpace: "normal",
            wordWrap: "break-word",
            overflowWrap: "break-word",
            display: "inline-block",
          }}
        >
          {note.text}
        </span>
      )}
      <div
        className="note-actions"
        style={{ marginLeft: "10px", display: "flex", flexDirection: "column" }}
      >
        <button onClick={handleEdit}>
          {isEditing ? "Зберегти" : "Редагувати"}
        </button>
        <button onClick={() => onDelete(note.id)}>Видалити</button>
        <button
          onClick={toggleImportant}
          style={{
            backgroundColor: isImportant ? "#ffeb3b" : "#ccc",
            color: isImportant ? "black" : "white",
          }}
        >
          {isImportant ? "Не важливо" : "Важливо"}
        </button>
      </div>
    </div>
  );
};

export default Note;
