import React, { useState, useEffect } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addYears,
  subYears,
} from "date-fns";
import { uk } from "date-fns/locale";
import Day from "./Day";
import NoteList from "./NoteList";
import DayView from "./DayView";
import YearView from "./YearView"; // Імпортуємо YearView
import "./styles/Calendar.css";
import "./styles/Day.css";
import "./styles/NoteList.css";

const daysOfWeek = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"];

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState(null);
  const [notes, setNotes] = useState(
    () => JSON.parse(localStorage.getItem("notes")) || {}
  );
  const [view, setView] = useState("month");

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes")) || {};
    setNotes(storedNotes);
  }, []);

  const next = () => {
    switch (view) {
      case "day":
        setCurrentDate(addDays(currentDate, 1));
        break;
      case "week":
        setCurrentDate(addDays(currentDate, 7));
        break;
      case "month":
        setCurrentDate(addMonths(currentDate, 1));
        break;
      case "year":
        setCurrentDate(addYears(currentDate, 1));
        break;
      default:
        break;
    }
  };

  const prev = () => {
    switch (view) {
      case "day":
        setCurrentDate(addDays(currentDate, -1));
        break;
      case "week":
        setCurrentDate(addDays(currentDate, -7));
        break;
      case "month":
        setCurrentDate(subMonths(currentDate, 1));
        break;
      case "year":
        setCurrentDate(subYears(currentDate, 1));
        break;
      default:
        break;
    }
  };

  const selectDate = (day) => {
    setSelectedDate(day);
    setSelectedHour(null);
  };

  const addNote = (note) => {
    const formattedDate = format(selectedDate, "yyyy-MM-dd");
    const updatedNotes = {
      ...notes,
      [formattedDate]: {
        ...notes[formattedDate],
        [selectedHour]: [
          ...(notes[formattedDate]?.[selectedHour] || []),
          { text: note, time: new Date() },
        ],
      },
    };
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes)); // Зберігаємо в localStorage
  };

  const editNote = (updatedNote, index) => {
    const formattedDate = format(selectedDate, "yyyy-MM-dd");
    const updatedNotes = {
      ...notes,
      [formattedDate]: {
        ...notes[formattedDate],
        [selectedHour]: notes[formattedDate][selectedHour].map((note, i) =>
          i === index ? { ...note, text: updatedNote } : note
        ),
      },
    };
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes)); // Оновлюємо у localStorage
  };

  const deleteNote = (index) => {
    const formattedDate = format(selectedDate, "yyyy-MM-dd");
    const updatedNotes = {
      ...notes,
      [formattedDate]: {
        ...notes[formattedDate],
        [selectedHour]: notes[formattedDate][selectedHour].filter(
          (_, i) => i !== index
        ),
      },
    };
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes)); // Оновлюємо у localStorage
  };

  const renderDays = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });
    const days = [];
    let day = startDate;

    while (day <= endDate) {
      days.push(
        <Day
          key={day}
          day={day}
          month={currentDate}
          notes={notes[format(day, "yyyy-MM-dd")] || {}}
          selectDate={selectDate}
          selectedDate={selectedDate}
          setSelectedHour={setSelectedHour}
        />
      );
      day = addDays(day, 1);
    }
    return days;
  };

  const renderWeek = () => {
    const startDate = startOfWeek(currentDate, { weekStartsOn: 1 });
    const endDate = endOfWeek(currentDate, { weekStartsOn: 1 });
    const days = [];
    let day = startDate;

    while (day <= endDate) {
      days.push(
        <Day
          key={day}
          day={day}
          month={currentDate}
          notes={notes[format(day, "yyyy-MM-dd")] || {}}
          selectDate={selectDate}
          selectedDate={selectedDate}
          setSelectedHour={setSelectedHour}
        />
      );
      day = addDays(day, 1);
    }
    return days;
  };

  return (
    <div className="calendar-wrapper">
      <div className="header">
        <button className="button" onClick={prev}>
          Назад
        </button>
        <h2>
          {format(
            currentDate,
            view === "day"
              ? "dd.MM.yyyy"
              : view === "week"
              ? "MMMM yyyy"
              : view === "month"
              ? "MMMM yyyy"
              : "yyyy"
          )}
        </h2>
        <button className="button" onClick={next}>
          Вперед
        </button>
      </div>

      <div className="view-buttons">
        <button className="view-button" onClick={() => setView("day")}>
          День
        </button>
        <button className="view-button" onClick={() => setView("week")}>
          Тиждень
        </button>
        <button className="view-button" onClick={() => setView("month")}>
          Місяць
        </button>
        <button className="view-button" onClick={() => setView("year")}>
          Рік
        </button>
      </div>

      {view === "month" ? (
        <>
          <div className="days-of-week">
            {daysOfWeek.map((day, index) => (
              <div key={index}>{day}</div>
            ))}
          </div>
          <div className="grid">{renderDays()}</div>
          {selectedDate && (
            <NoteList
              date={selectedDate}
              notes={notes[format(selectedDate, "yyyy-MM-dd")] || []}
              addNote={addNote}
              editNote={editNote}
              deleteNote={deleteNote}
            />
          )}
        </>
      ) : view === "week" ? (
        <div className="grid">{renderWeek()}</div>
      ) : view === "year" ? (
        <YearView
          currentDate={currentDate}
          selectDate={selectDate}
          notes={notes}
          onPrevYear={prev}
          onNextYear={next}
          onViewChange={setView}
        />
      ) : (
        selectedDate && <DayView date={selectedDate} notes={notes} />
      )}
    </div>
  );
};

export default Calendar;
