import React, { useState } from "react";
import "./Races.css"; // Подключаем стили

const races = {
  Человек: "Универсальные способности, бонус +1 ко всем характеристикам.",
  Эльф: "Долгая жизнь, чувствительность к магии, тёмное зрение.",
  Дварф: "Высокая выносливость, устойчивость к ядам, мастерство в кузнечном деле.",
  Тифлинг: "Демоническое наследие, бонус к магии, сопротивление огню.",
  Драконорожденный: "Драконья кровь, дыхательное оружие, сопротивление определённому типу урона.",
  Полуорк: "Высокая сила, дикость в бою, способность продолжать сражаться даже на грани смерти.",
  Гном: "Интеллект, владение магией иллюзий, устойчивость к магии.",
  Хафлинг: "Ловкость, удача, способность проходить сквозь тесные места.",
  Дженази: "Потомки элементалей, могут управлять стихиями.",
  Аасимар: "Божественное происхождение, светящееся оружие, способности к исцелению."
};

const RaceSelector = () => {
  const [selectedRace, setSelectedRace] = useState("Человек");

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
      <div className="race-info-box">
        <h3>{selectedRace}</h3>
        <p>{races[selectedRace]}</p>
      </div>
    </div>
  );
};

export default RaceSelector;