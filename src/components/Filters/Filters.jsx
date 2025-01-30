import React, { useState } from "react";
import "./Filters.css";

const Filters = ({ filterOptions, onApplyFilters }) => {
  const initialFilters = {
    name: "",
    level: "",
    ritual: false,
    castingTime: "",
    rangeFt: "",
    componentV: null,
    componentS: null,
    componentM: null,
    excludeComponentV: null,
    excludeComponentS: null,
    excludeComponentM: null,
    concentration: false,
    duration: "",
    school: "",
    class: "",
  };

  const [filters, setFilters] = useState(initialFilters);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prev) => {
      const updatedFilters = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };
      onApplyFilters(updatedFilters);
      return updatedFilters;
    });
  };

  const toggleComponentFilter = (component, isExclude = false) => {
    setFilters((prev) => {
      const newFilters = { ...prev };

      if (isExclude) {
        // Если выбираем "Не включает", сбрасываем "Включает"
        newFilters[component] = null;
        newFilters[`exclude${component.charAt(0).toUpperCase() + component.slice(1)}`] =
          prev[`exclude${component.charAt(0).toUpperCase() + component.slice(1)}`] === true ? null : true;
      } else {
        // Если выбираем "Включает", сбрасываем "Не включает"
        newFilters[`exclude${component.charAt(0).toUpperCase() + component.slice(1)}`] = null;
        newFilters[component] = prev[component] === true ? null : true;
      }

      onApplyFilters(newFilters);
      return newFilters;
    });
  };

  const resetComponentFilters = () => {
    setFilters((prev) => {
      const updatedFilters = {
        ...prev,
        componentV: null,
        componentS: null,
        componentM: null,
        excludeComponentV: null,
        excludeComponentS: null,
        excludeComponentM: null,
      };
      onApplyFilters(updatedFilters);
      return updatedFilters;
    });
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
        <select name="level" value={filters.level} onChange={handleChange}>
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
      <div className="filters-container">
      <label>Компоненты:</label>
      <div className="components-filter-grid">
        <div className="components-column">
          <p>Включает:</p>
          {["componentV", "componentS", "componentM"].map((comp) => (
            <label key={comp} className="checkbox-label">
              <input
                type="checkbox"
                checked={filters[comp] === true}
                onChange={() => toggleComponentFilter(comp)}
              />
              <span className="checkbox-content">{comp.charAt(comp.length - 1).toUpperCase()}</span>
            </label>
          ))}
        </div>

        <div className="components-column">
          <p>Не включает:</p>
          {["componentV", "componentS", "componentM"].map((comp) => (
            <label key={`exclude${comp}`} className="checkbox-label">
              <input
                type="checkbox"
                checked={filters[`exclude${comp.charAt(0).toUpperCase() + comp.slice(1)}`] === true}
                onChange={() => toggleComponentFilter(comp, true)}
              />
              <span className="checkbox-content">{comp.charAt(comp.length - 1).toUpperCase()}</span>
            </label>
          ))}
        </div>
      </div>

      <button className="reset-filter" onClick={resetComponentFilters}>
        Сбросить компоненты
      </button>
    </div>

      {/* Ритуал */}
      <label className="checkbox-label">
        Ритуал:
        <div
          className={`checkbox-button ${filters.ritual ? "checked" : ""}`}
          onClick={() =>
            handleChange({
              target: {
                name: "ritual",
                checked: !filters.ritual,
                type: "checkbox",
              },
            })
          }
        ></div>
      </label>

      {/* Концентрация */}
      <label className="checkbox-label">
        Концентрация:
        <div
          className={`checkbox-button ${
            filters.concentration ? "checked" : ""
          }`}
          onClick={() =>
            handleChange({
              target: {
                name: "concentration",
                checked: !filters.concentration,
                type: "checkbox",
              },
            })
          }
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
      <button className="reset-filter" onClick={handleReset}>
        Сбросить фильтры
      </button>
    </div>
  );
};

export default Filters;
