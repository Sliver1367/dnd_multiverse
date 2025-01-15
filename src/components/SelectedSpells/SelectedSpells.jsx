import React from "react";
import "./SelectedSpells.css";

const SelectedSpells = ({ selectedSpells }) => {
  return (
    <div className="selected-spells">
      <h2>Выбранные заклинания:</h2>
      {selectedSpells.length === 0 ? (
        <p>Нет выбранных заклинаний</p>
      ) : (
        <ul>
          {selectedSpells.map((spell, index) => (
            <li key={index}>{spell.titleRus}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectedSpells;