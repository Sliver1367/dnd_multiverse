import React, { useState } from "react";
import "../Races/Races.css";

// Импортируем все расы как отдельные компоненты
import Human from "../Human/Human";
import Elf from "../Elf/Elf";
import Goliath from "../Goliath/Goliath"; 
import Aasimar from "../Aasimar/Aasimar"; 

const races = {
  Человек: Human,
  Эльф: Elf,
  Аасимар: Aasimar,
  Голиаф: Goliath, // Добавили новую расу
};

const Races = () => {
  const [selectedRace, setSelectedRace] = useState("Человек");

  const SelectedRaceComponent = races[selectedRace]; // Получаем соответствующий компонент

  return (
    <div className="race-container">
      <h2>Выберите расу</h2>
      <div className="race-button-container">
        {Object.keys(races).map((race) => (
          <button
            key={race}
            className={selectedRace === race ? "race-button active" : "race-button"}
            onClick={() => setSelectedRace(race)}
          >
            {race}
          </button>
        ))}
      </div>
      <SelectedRaceComponent /> {/* Отображаем компонент выбранной расы */}
    </div>
  );
};

export default Races;