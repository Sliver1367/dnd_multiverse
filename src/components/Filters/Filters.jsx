import React, { useState } from "react";
import "./Filters.css";

const Filters = ({ filterOptions, onApplyFilters }) => {
  const initialFilters = {
    name: "",
    level: "",
    ritual: false,
    castingTime: "",
    rangeFt: "",
    componentV: false,
    componentS: false,
    componentM: false,
    concentration: false,
    duration: "",
    school: "",
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

  const handleComponentChange = (name) => {
    const newFilters = {
      componentV: false,
      componentS: false,
      componentM: false,
      [name]: true,
    };
    setFilters({ ...filters, ...newFilters });
    onApplyFilters({ ...filters, ...newFilters });
  };

  const resetComponentFilters = () => {
    setFilters({
      ...filters,
      componentV: false,
      componentS: false,
      componentM: false,
    });
    onApplyFilters({
      ...filters,
      componentV: false,
      componentS: false,
      componentM: false,
    });
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
      {/* Поиск по названию */}
      <label>
        Название заклинания:
        <div className="input-with-reset">
          <input
            type="text"
            name="name"
            value={filters.name}
            onChange={(e) => handleChange(e)}
            placeholder="Введите название"
          />
          {filters.name && (
            <button
              className="reset-text-button"
              onClick={() =>
                setFilters((prev) => {
                  const updatedFilters = { ...prev, name: "" };
                  onApplyFilters(updatedFilters);
                  return updatedFilters;
                })
              }
            >
              ✖
            </button>
          )}
        </div>
      </label>
      {/* Уровень */}
      <label>
        Уровень:
        <select
          name="level"
          value={filters.level}
          onChange={(e) => {
            handleChange(e);
          }}
        >
          <option value="">Все</option>
          {filterOptions.levels?.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </label>
      {/* Время накладывания */}
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
      {/* Длительность */}
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
      {/* Школа заклинаний */}
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
      {/* Компоненты */}
      <div className="components-filters">
        <label>Компоненты:</label>
        <div className="components-checkboxes">
          <label>
            <input
              type="checkbox"
              checked={filters.componentV}
              onChange={() => handleComponentChange("componentV")}
            />
            В
          </label>
          <label>
            <input
              type="checkbox"
              checked={filters.componentS}
              onChange={() => handleComponentChange("componentS")}
            />
            С
          </label>
          <label>
            <input
              type="checkbox"
              checked={filters.componentM}
              onChange={() => handleComponentChange("componentM")}
            />
            М
          </label>
        </div>
        <button onClick={resetComponentFilters}>
          Сбросить фильтр компонентов
        </button>
      </div>
      {/* Ритуал */}
      <label className="checkbox-label">
        Ритуал:
        <div
          className={`checkbox-button ${filters.ritual ? "checked" : ""}`}
          onClick={() => toggleCheckbox("ritual")}
        ></div>
      </label>
      {/* Концентрация */}
      <label className="checkbox-label">
        Концентрация:
        <div
          className={`checkbox-button ${
            filters.concentration ? "checked" : ""
          }`}
          onClick={() => toggleCheckbox("concentration")}
        ></div>
      </label>
      {/* Классы */}
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
      {/* Сброс всех фильтров */}
      <button className="reset-button" onClick={handleReset}>
        Сбросить фильтры
      </button>
    </div>
  );
};

export default Filters;
