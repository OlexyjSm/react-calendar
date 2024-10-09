import React from "react";
import {
  format,
  startOfYear,
  endOfMonth,
  addMonths,
  getDay,
  eachDayOfInterval,
} from "date-fns";
import { uk } from "date-fns/locale";
import "../index.css";

const daysOfWeek = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"];

const YearView = ({
  currentDate,
  selectDate,
  notes,
  onPrevYear,
  onNextYear,
  onViewChange,
}) => {
  const renderMonths = () => {
    const startYear = startOfYear(currentDate); // Початок року
    const months = [];

    for (let i = 0; i < 12; i++) {
      const monthStart = addMonths(startYear, i); // Кожен місяць у році
      const monthEnd = endOfMonth(monthStart); // Кінець поточного місяця
      const days = [];
      const firstDayIndex =
        getDay(monthStart) === 0 ? 6 : getDay(monthStart) - 1; // Визначаємо зміщення початкового дня місяця

      // Додаємо порожні клітинки для вирівнювання початку місяця
      for (let j = 0; j < firstDayIndex; j++) {
        days.push(<div key={`empty-${i}-${j}`} className="day empty"></div>);
      }

      // Додаємо дні місяця
      eachDayOfInterval({ start: monthStart, end: monthEnd }).forEach((day) => {
        const dateKey = format(day, "yyyy-MM-dd");
        days.push(
          <div key={day} className="day" onClick={() => selectDate(day)}>
            {format(day, "d")}
            {notes[dateKey] && notes[dateKey].length > 0 && (
              <span className="dot"></span> // Крапка, якщо є нотатки
            )}
          </div>
        );
      });

      // Додаємо місяць до масиву
      months.push(
        <div key={i} className="month">
          <h3>{format(monthStart, "MMMM", { locale: uk })}</h3>
          <div className="day-names">
            {daysOfWeek.map((day, index) => (
              <div key={index} className="day-name">
                {day}
              </div>
            ))}
          </div>
          <div className="days">{days}</div>
        </div>
      );
    }

    return (
      <div className="year-grid">
        {months
          .reduce((rows, month, index) => {
            if (index % 4 === 0) rows.push([]); // Новий рядок кожні 4 місяці
            rows[rows.length - 1].push(month); // Додаємо місяць в рядок
            return rows;
          }, [])
          .map((row, index) => (
            <div className="year-row" key={index}>
              {row}
            </div>
          ))}
      </div>
    );
  };

  return <div className="year-view">{renderMonths()}</div>;
};

export default YearView;
