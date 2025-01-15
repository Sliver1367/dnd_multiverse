import React from "react";
import "./SpellCard.css";

const SpellCard = ({ spell, isSelected, onSelect }) => {
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
        <table className="spell-card__table">
          <tbody>
            <tr>
              <td>
                <strong>Время накладывания:</strong>
              </td>
              <td>{spell.castingTimeRus}</td>
            </tr>
            <tr>
              <td>
                <strong>Дистанция:</strong>
              </td>
              <td>{spell.rangeFt} футов</td>
            </tr>
            <tr>
              <td>
                <strong>Компоненты:</strong>
              </td>
              <td>
                {spell.componentV === "TRUE" && "В "}
                {spell.componentS === "TRUE" && "С "}
                {spell.componentM === "TRUE" && `М (${spell.componentMRus})`}
              </td>
            </tr>
            <tr>
              <td>
                <strong>Длительность:</strong>
              </td>
              <td>{spell.durationRus}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="spell-card__description">
        <p>{spell.descriptionRus}</p>
      </div>
      {spell.onHigherLevelRus && (
        <div className="spell-card__higher-level">
          <h3>На более высоком уровне</h3>
          <p>{spell.onHigherLevelRus}</p>
        </div>
      )}
      <div className="spell-card__footer">
        <p>{spell.schoolRus || spell.school}</p>
      </div>
    </div>
  );
};

export default SpellCard;