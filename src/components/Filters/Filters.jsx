import React, { useState } from "react";
import "./Filters.css";

const Filters = ({ filterOptions, onApplyFilters }) => {
  const initialFilters = {
    level: "",
    ritual: false,
    castingTime: "",
    rangeFt: "",
    componentV: false,
    componentS: false,
    componentM: false,
    concentration: false,
    duration: "",
    onHigherLevel: false,
    school: "",
    class: "",
  };

  const [filters, setFilters] = useState(initialFilters);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newFilters = {
      ...filters,
      [name]: type === "checkbox" ? checked : value,
    };
    setFilters(newFilters);
    onApplyFilters(newFilters);
  };

  const toggleCheckbox = (name) => {
    const newFilters = {
      ...filters,
      [name]: !filters[name],
    };
    setFilters(newFilters);
    onApplyFilters(newFilters);
  };

  const handleReset = () => {
    setFilters(initialFilters);
    onApplyFilters(initialFilters);
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

      <label>
        Класс:
        <select name="class" value={filters.class} onChange={handleChange}>
          <option value="">Все</option>
          {filterOptions.classes?.map((cls) => (
            <option key={cls} value={cls}>
              {cls}
            </option>
          ))}
        </select>
      </label>

      <label className="checkbox-label">
        Ритуал:
        <div
          className={`checkbox-button ${filters.ritual ? "checked" : ""}`}
          onClick={() => toggleCheckbox("ritual")}
        ></div>
      </label>

      <label className="checkbox-label">
        Концентрация:
        <div
          className={`checkbox-button ${
            filters.concentration ? "checked" : ""
          }`}
          onClick={() => toggleCheckbox("concentration")}
        ></div>
      </label>

      <label className="checkbox-label">
        Материальный компонент:
        <div
          className={`checkbox-button ${filters.componentM ? "checked" : ""}`}
          onClick={() => toggleCheckbox("componentM")}
        ></div>
      </label>

      <button className="reset-button" onClick={handleReset}>
        Сбросить фильтры
      </button>
    </div>
  );
};

export default Filters;