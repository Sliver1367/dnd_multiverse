import React from "react";
import "./Race.css"; // Если стили лежат рядом

const Race = ({ race }) => {
  if (!race) return <p>Раса не найдена</p>;

  return (
    <div className="race-info-box">
      <h3>{race.titleRus || race.title}</h3>
      <p dangerouslySetInnerHTML={{ __html: race.descriptionRus || race.description }} />

      {/* Если поле kindOfRace есть, выводим */}
      {(race.kindOfRaceRus || race.kindOfRace) && (
        <div className="race-subtype">
          <h4>Подтип расы:</h4>
          <p dangerouslySetInnerHTML={{ __html: race.kindOfRaceRus || race.kindOfRace }} />
        </div>
      )}

      <h4>Особенности:</h4>
      <ul>
        <li><b>Тип существа:</b> {race.creatureTypeRus || race.creatureType}</li>
        <li><b>Размер:</b> {race.sizeRus || race.size}</li>
        <li><b>Скорость:</b> {race.speedRus || race.speed}</li>
      </ul>

      <h4>Умения:</h4>
      <p dangerouslySetInnerHTML={{ __html: race.traitsRus || race.traits }} />
    </div>
  );
};

export default Race;