// src/components/Races/Races.js
import React, { useState } from "react";
import Race from "../Race/Race";
import "./Races.css";

// src/data/racesData.js
const racesData = [
  {
    name: "Человек",
    description: "Люди — универсальная раса, обладающая разнообразными талантами и возможностями.",
    type: "Гуманоид",
    size: "Средний",
    speed: "30 футов",
    abilities: [
      { name: "Адаптивность", description: "Получает +1 к двум характеристикам." },
      { name: "Разнообразие навыков", description: "Выбирает один навык для мастерства." }
    ]
  },
  {
    name: "Эльф",
    description: "Эльфы — грациозные существа, обладающие магическим чутьем и долговечностью.",
    type: "Гуманоид",
    size: "Средний",
    speed: "30 футов",
    abilities: [
      { name: "Тёмное зрение", description: "Видит в темноте на 60 футов." },
      { name: "Ловкость", description: "Получает +2 к Ловкости." }
    ]
  },
  {
    name: "Аасимар",
    description: "Аасимары — смертные, несущие искры Верхних планов в своих душах.",
    type: "Гуманоид",
    size: "Средний",
    speed: "30 футов",
    abilities: [
      { name: "Небесное сопротивление", description: "Сопротивление некротическому урону и урону излучением." },
      { name: "Исцеляющие руки", description: "Может лечить касанием." }
    ]
  },
  {
    name: "Голиаф",
    description: "Голиафы — огромные и мощные существа, живущие в горах.",
    type: "Гуманоид",
    size: "Средний",
    speed: "30 футов",
    abilities: [
      { name: "Каменная стойкость", description: "Может уменьшить получаемый урон." },
      { name: "Мощные атаки", description: "Бонус к урону при использовании оружия." }
    ]
  }
];

const Races = () => {
  const [selectedRace, setSelectedRace] = useState(racesData[0]); // По умолчанию первая раса

  return (
    <div className="race-container">
      <h2>Выберите расу</h2>
      <div className="race-button-container">
        {racesData.map((race) => (
          <button
            key={race.name}
            className={selectedRace.name === race.name ? "race-button active" : "race-button"}
            onClick={() => setSelectedRace(race)}
          >
            {race.name}
          </button>
        ))}
      </div>

      <Race race={selectedRace} />
    </div>
  );
};

export default Races;