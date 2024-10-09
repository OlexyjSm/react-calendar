import React, { useState } from "react";
import { format, isSameMonth, isSameDay } from "date-fns";
import Modal from "./Modal"; // Імпортуємо модальне вікно

const Day = ({
  day,
  month,
  notes,
  selectDate,
  selectedDate,
  setSelectedHour,
}) => {
  const formattedDate = format(day, "d");
  const isCurrentMonth = isSameMonth(day, month);
  const isSelected = isSameDay(day, selectedDate);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const handleSelectHour = (hour) => {
    setSelectedHour(hour); // Встановлюємо обрану годину
    selectDate(day); // Вибираємо день
  };

  const openModal = (note) => {
    setSelectedNote(note);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNote(null);
  };

  const handleEditNote = () => {
    // Логіка для редагування нотатки (може бути реалізована далі)
    closeModal();
  };

  const handleDeleteNote = () => {
    // Логіка для видалення нотатки (може бути реалізована далі)
    closeModal();
  };

  return (
    <div
      className={`day ${isCurrentMonth ? "" : "disabled"} ${
        isSelected ? "selected" : ""
      }`}
    >
      <div className="day-number" onClick={() => selectDate(day)}>
        {formattedDate}
      </div>
      <div className="hours">
        {Array.from({ length: 24 }, (_, i) => (
          <div
            key={i}
            className={`hour ${notes[i] ? "has-notes" : ""}`}
            onClick={() => handleSelectHour(i)} // Вибір години
          >
            {i}:00
            {notes[i] && (
              <div className="notes">
                {notes[i].map((note, index) => (
                  <div
                    key={index}
                    className="note"
                    onClick={() => openModal(note)}
                  >
                    {note.text.split(" ").slice(0, 2).join(" ")}{" "}
                    {/* Відображення перших двох слів */}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        note={selectedNote}
        onEdit={handleEditNote}
        onDelete={handleDeleteNote}
      />
    </div>
  );
};

export default Day;
