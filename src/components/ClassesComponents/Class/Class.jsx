import React from "react";
import "./Class.css";

const Class = ({ charClass }) => {
  if (!charClass) return <p>Класс не найден</p>;

  return (
    <div className="class-info-box">
      <h3>{charClass.name} ({charClass.nameEn})</h3>
      <p><strong>Кость хитов:</strong> {charClass.hitDice}</p>
      <p><strong>Основная характеристика:</strong> {charClass.primaryAbility}</p>
      <p><strong>Спасброски:</strong> {charClass.savingThrows.join(", ")}</p>

      <h4>Снаряжение:</h4>
      <ul>
        <li><b>Доспехи:</b> {charClass.armorWeapons.armor.join(", ")}</li>
        <li><b>Оружие:</b> {charClass.armorWeapons.weapons.join(", ")}</li>
      </ul>

      <h4>Стартовое снаряжение:</h4>
      <ul>
        {charClass.startingEquipment.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <h4>Особенности:</h4>
      <ul>
        {charClass.features.map((feature, index) => (
          <li key={index}>
            <b>{feature.name} (Уровень {feature.level}):</b> {feature.description}
          </li>
        ))}
      </ul>

      <h4>Подклассы:</h4>
      <ul>
        {charClass.subclasses.map((subclass, index) => (
          <li key={index}>
            <b>{subclass.name}:</b> {subclass.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Class;