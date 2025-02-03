// src/components/Race/Race.js
import React from "react";

const Race = ({ race }) => {
  if (!race) return <p>Раса не найдена</p>;

  return (
    <div className="race-info-box">
      <h3>{race.name}</h3>
      <p>{race.description}</p>

      <h4>🔹 Особенности {race.name}:</h4>
      <ul>
        <li><b>Тип существа:</b> {race.type}</li>
        <li><b>Размер:</b> {race.size}</li>
        <li><b>Скорость:</b> {race.speed}</li>
      </ul>

      <h4>🎭 Способности:</h4>
      <ul>
        {race.abilities.map((ability, index) => (
          <li key={index}><b>{ability.name}:</b> {ability.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default Race;