import React from "react";
import "./styles/Modal.css"; // Імпортуємо стилі для модального вікна

const Modal = ({ isOpen, onClose, note, onEdit, onDelete }) => {
  if (!isOpen) return null; // Якщо модальне вікно не відкрите, нічого не показуємо

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Деталі нотатки</h2>
        <p>{note ? note.text : "Немає вибраної нотатки"}</p>
        <div className="modal-buttons">
          <button onClick={onEdit}>Редагувати</button>
          <button onClick={onDelete}>Видалити</button>
          <button onClick={onClose}>Закрити</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
