import React, { useState } from "react";
import "./Filters.css";

const Filters = ({ filterOptions, onApplyFilters }) => {
  const [filters, setFilters] = useState({
    level: "",
    castingTime: "",
    duration: "",
    school: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onApplyFilters(newFilters);
  };

  return (
    <div className="filters-container">
      <label>
        Уровень:
        <select name="level" value={filters.level} onChange={handleChange}>
          <option value="">Все</option>
          {filterOptions.levels?.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </label>

      <label>
        Время накладывания:
        <select
          name="castingTime"
          value={filters.castingTime}
          onChange={handleChange}
        >
          <option value="">Все</option>
          {filterOptions.castingTimes?.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      </label>

      <label>
        Длительность:
        <select
          name="duration"
          value={filters.duration}
          onChange={handleChange}
        >
          <option value="">Все</option>
          {filterOptions.durations?.map((duration) => (
            <option key={duration} value={duration}>
              {duration}
            </option>
          ))}
        </select>
      </label>

      <label>
        Школа заклинаний:
        <select name="school" value={filters.school} onChange={handleChange}>
          <option value="">Все</option>
          {filterOptions.schools?.map((school) => (
            <option key={school} value={school}>
              {school}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default Filters;