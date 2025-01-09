import React from "react";
import "./SpellCard.css"; // Файл стилей, который мы создадим отдельно

const SpellCard = ({
  title,
  level,
  category,
  castingTime,
  range,
  components,
  duration,
  description,
  higherLevelDescription,
  spellClass
}) => {
  return (
    <div className="spell-card">
      <div className="spell-card__header">
        <h1>{title}</h1>
        <p>
          {level} уровень - {category}
        </p>
      </div>

      <div className="spell-card__details">
        <div>
          <strong>Время накладывания:</strong>
          <span>{castingTime}</span>
        </div>
        <div>
          <strong>Дистанция:</strong>
          <span>{range}</span>
        </div>
        <div>
          <strong>Компоненты:</strong>
          <span>{components}</span>
        </div>
        <div>
          <strong>Длительность:</strong>
          <span>{duration}</span>
        </div>
      </div>

      <div className="spell-card__description">
        <p>{description}</p>
      </div>

      {higherLevelDescription && (
        <div className="spell-card__higher-level">
          <h3>На более высоком уровне</h3>
          <p>{higherLevelDescription}</p>
        </div>
      )}

      <div className="spell-card__footer">
        <p>{spellClass} - Базовые заклинания</p>
      </div>
    </div>
  );
};

export default SpellCard;
