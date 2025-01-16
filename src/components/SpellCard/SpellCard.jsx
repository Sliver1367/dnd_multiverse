import React, { useState } from "react";
import "./SpellCard.css";

const SpellCard = ({ spell, isSelected, onSelect }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const descriptionLengthLimit = 730;

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const isLongDescription = spell.descriptionRus.length > descriptionLengthLimit;

  return (
    <div
      className={`spell-card ${isSelected ? "selected" : ""}`}
      onClick={onSelect}
    >
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
            {spell.componentV === "TRUE" && "В "}
            {spell.componentS === "TRUE" && "С "}
            {spell.componentM === "TRUE" && `М (${spell.componentMRus})`}
          </div>
          <div>
            <strong>Длительность:</strong> {spell.durationRus}
          </div>
        </div>
      </div>
      <div
        className={`spell-card__description ${
          isExpanded || !isLongDescription ? "expanded" : ""
        }`}
      >
        <div dangerouslySetInnerHTML={{ __html: spell.descriptionRus }} />
      </div>
      {spell.onHigherLevelRus && (
        <div className="spell-card__higher-level">
          <h3>На более высоком уровне</h3>
          <div dangerouslySetInnerHTML={{ __html: spell.onHigherLevelRus }} />
        </div>
      )}
      {isLongDescription && (
        <div className="spell-card__footer">
          <button className="spell-card__toggle" onClick={toggleExpand}>
            <span
              className={`spell-card__arrow ${
                isExpanded ? "arrow-up" : "arrow-down"
              }`}
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default SpellCard;