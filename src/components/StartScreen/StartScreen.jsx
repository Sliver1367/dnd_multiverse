import React from "react";
import "./StartScreen.css";

const StartScreen = ({ onOptionSelect }) => {
  return (
    <div className="start-screen">
      <h1>Добро пожаловать!</h1>
      <p>Выберите опцию:</p>
      <button onClick={() => onOptionSelect("spells")}>
        База данных заклинаний
      </button>
      <button onClick={() => onOptionSelect("character")}>
        Создание карточки персонажа
      </button>
    </div>
  );
};

export default StartScreen;
