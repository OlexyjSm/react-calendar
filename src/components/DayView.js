import React, { useState } from "react";
import { format, addDays } from "date-fns";

const DayView = ({ date, notes }) => {
  const [currentDate, setCurrentDate] = useState(date);

  const changeDay = (days) => {
    const newDate = addDays(currentDate, days);
    setCurrentDate(newDate);
  };

  const formattedDate = format(currentDate, "yyyy-MM-dd");
  const dayNotes = notes[formattedDate] || {}; // Отримуємо нотатки для вибраного дня

  return (
    <div className="day-view">
      <h3>{format(currentDate, "EEEE, d MMMM yyyy")}</h3>
      <div className="time-slots">
        {Array.from({ length: 24 }, (_, i) => (
          <div key={i} className="time-slot">
            <span>{`${i}:00`}</span>
            {dayNotes[i] && Array.isArray(dayNotes[i]) ? (
              dayNotes[i].map((note, index) => (
                <div key={index} className="note">
                  {note.text.split(" ").slice(0, 2).join(" ")}
                  <button onClick={() => console.log(note)}>Деталі</button>
                </div>
              ))
            ) : (
              <div className="note">Нотатків немає</div> // Якщо нотатків немає
            )}
          </div>
        ))}
      </div>
      <button onClick={() => changeDay(-1)}>Попередній день</button>
      <button onClick={() => changeDay(1)}>Наступний день</button>
    </div>
  );
};

export default DayView;
