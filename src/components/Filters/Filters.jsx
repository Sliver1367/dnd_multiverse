import React, { useState } from "react";
import "./Filters.css";

const Filters = ({ filterOptions, onApplyFilters }) => {
  const initialFilters = {
    name: "",
    level: "",
    castingTime: "",
    rangeFt: "",
    componentV: null,
    componentS: null,
    componentM: null,
    excludeComponentV: null,
    excludeComponentS: null,
    excludeComponentM: null,
    ritual: null,
    excludeRitual: null,
    concentration: null,
    excludeConcentration: null,
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

  const toggleFilter = (filterName, isExclude = false) => {
    setFilters((prev) => {
      const updatedFilters = { ...prev };

      if (isExclude) {
        updatedFilters[filterName] = null;
        updatedFilters[
          `exclude${filterName.charAt(0).toUpperCase() + filterName.slice(1)}`
        ] =
          prev[
            `exclude${filterName.charAt(0).toUpperCase() + filterName.slice(1)}`
          ] === true
            ? null
            : true;
      } else {
        updatedFilters[
          `exclude${filterName.charAt(0).toUpperCase() + filterName.slice(1)}`
        ] = null;
        updatedFilters[filterName] = prev[filterName] === true ? null : true;
      }

      onApplyFilters(updatedFilters);
      return updatedFilters;
    });
  };

  const handleReset = () => {
    setFilters(initialFilters);
    onApplyFilters(initialFilters);
  };

  const handleResetComponents = () => {
    const updatedFilters = {
      ...filters,
      componentV: null,
      componentS: null,
      componentM: null,
      excludeComponentV: null,
      excludeComponentS: null,
      excludeComponentM: null,
      ritual: null,
      excludeRitual: null,
      concentration: null,
      excludeConcentration: null,
    };
    setFilters(updatedFilters);
    onApplyFilters(updatedFilters);
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

      {/* Время использования */}
      <label>
        Время использования:
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

      <div className="filters-container">
        {/* Компоненты */}
        <div className="filters-container">
          <div className="components-filter-grid">
            {/* Включает */}
            <div className="components-column">
              <p>Включает:</p>
              {[
                "componentV",
                "componentS",
                "componentM",
                "ritual",
                "concentration",
              ].map((filter) => (
                <label key={filter} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={filters[filter] === true}
                    onChange={() => toggleFilter(filter)}
                  />
                  <span className="checkbox-content">
                    {filter === "componentV"
                      ? "В"
                      : filter === "componentS"
                      ? "С"
                      : filter === "componentM"
                      ? "М"
                      : filter === "ritual"
                      ? "Рит"
                      : "Кон"}
                  </span>
                </label>
              ))}
            </div>

            {/* Не включает */}
            <div className="components-column">
              <p>Не включает:</p>
              {[
                "componentV",
                "componentS",
                "componentM",
                "ritual",
                "concentration",
              ].map((filter) => (
                <label key={`exclude${filter}`} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={
                      filters[
                        `exclude${
                          filter.charAt(0).toUpperCase() + filter.slice(1)
                        }`
                      ] === true
                    }
                    onChange={() => toggleFilter(filter, true)}
                  />
                  <span className="checkbox-content">
                    {filter === "componentV"
                      ? "В"
                      : filter === "componentS"
                      ? "С"
                      : filter === "componentM"
                      ? "М"
                      : filter === "ritual"
                      ? "Рит"
                      : "Кон"}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Кнопка сброса только компонентов */}
          <button
            className="reset-components-button"
            onClick={handleResetComponents}
          >
            Сбросить
          </button>
        </div>
      </div>
      {/* Сброс всех фильтров */}
      <button className="reset-filter" onClick={handleReset}>
        Сбросить фильтры
      </button>
    </div>
  );
};

export default Filters;
