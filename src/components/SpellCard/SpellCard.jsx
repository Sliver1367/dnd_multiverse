import React, { useState } from "react";
import "./SpellCard.css";

const SpellCard = ({ spell, isSelected, onSelect }) => {
  const [currentPart, setCurrentPart] = useState(0);
  const descriptionLengthLimit = 500;

  if (!spell) return null; // Проверка на случай отсутствия данных

  const descriptionParts = Array.from(
    { length: Math.ceil(spell.descriptionRus.length / descriptionLengthLimit) },
    (_, i) =>
      spell.descriptionRus.slice(
        i * descriptionLengthLimit,
        (i + 1) * descriptionLengthLimit
      )
  );

  const handleNextPart = () =>
    setCurrentPart((prev) => Math.min(prev + 1, descriptionParts.length - 1));
  const handlePreviousPart = () =>
    setCurrentPart((prev) => Math.max(prev - 1, 0));

  return (
    <div className={`spell-card ${isSelected ? "selected" : ""}`}>
      <div className="spell-card__header">
        <h1>{spell.titleRus}</h1>
        <p>
          {spell.level} уровень - {spell.schoolRus || spell.school}
        </p>
      </div>
      <div className="spell-card__details">
        <div className="spell-card__mini-table">
          <div>
            <strong>Время:</strong> {spell.castingTimeRus}
          </div>
          <div>
            <strong>Дистанция:</strong> {spell.rangeFt} футов
          </div>
          <div>
            <strong>Компоненты:</strong>{" "}
            {spell.componentV && "В "}
            {spell.componentS && "С "}
            {spell.componentM && `М (${spell.componentMRus})`}
          </div>
          <div>
            <strong>Длительность:</strong> {spell.durationRus}
          </div>
        </div>
      </div>
      <div className="spell-card__description">
        <div
          dangerouslySetInnerHTML={{
            __html: descriptionParts[currentPart],
          }}
        />
      </div>
      {spell.onHigherLevelRus && currentPart === 0 && (
        <div className="spell-card__higher-level">
          <h3>На более высоком уровне</h3>
          <div
            dangerouslySetInnerHTML={{ __html: spell.onHigherLevelRus }}
          />
        </div>
      )}
      <div className="spell-card__footer">
        {currentPart > 0 && (
          <button
            className="spell-card__nav-button"
            onClick={handlePreviousPart}
            disabled={currentPart === 0}
          >
            ←
          </button>
        )}
        <button
          className={`spell-card__select-button ${
            isSelected ? "selected" : ""
          }`}
          onClick={onSelect}
        >
          {isSelected ? "Отменить выбор" : "Выбрать"}
        </button>
        {currentPart < descriptionParts.length - 1 && (
          <button
            className="spell-card__nav-button"
            onClick={handleNextPart}
            disabled={currentPart === descriptionParts.length - 1}
          >
            →
          </button>
        )}
      </div>
    </div>
  );
};

export default SpellCard;