import React, { useState } from "react";
import Class from "../Class/Class";
import "./Classes.css";

const classData = [
  {
    id: 1,
    name: "Варвар",
    nameEn: "Barbarian",
    hitDice: "1к12 за уровень варвара",
    primaryAbility: "Сила",
    savingThrows: ["Сила", "Телосложение"],
    armorWeapons: {
      armor: ["Лёгкие доспехи", "Средние доспехи", "Щиты"],
      weapons: ["Простое оружие", "Военное оружие"]
    },
    startingEquipment: [
      "Боевой топор или любое военное оружие",
      "Два ручных топора или любое простое оружие",
      "Набор исследователя подземелий или путешественника",
      "Четыре метательных копья"
    ],
    features: [
      {
        level: 1,
        name: "Ярость",
        description: "Варвар может впасть в ярость, увеличивая урон и стойкость."
      },
      {
        level: 1,
        name: "Бездоспешная защита",
        description: "Если не носит доспехов, получает бонус к КД от Ловкости и Телосложения."
      },
      {
        level: 2,
        name: "Безрассудная атака",
        description: "Можно получить преимущество на атаки, но враги тоже получают преимущество против варвара."
      },
      {
        level: 2,
        name: "Опасное чутьё",
        description: "Получает преимущество на спасброски Ловкости против видимых угроз."
      }
    ],
    subclasses: [
      {
        name: "Путь Берсерка",
        description: "Классический варвар, фокусирующийся на ярости и безудержных атаках."
      },
      {
        name: "Путь Дикого сердца",
        description: "Варвар, черпающий силу у природы и диких зверей."
      },
      {
        name: "Путь Мирового древа",
        description: "Варвар, связанный с древними духами и мистическими силами."
      },
      {
        name: "Путь Фанатика",
        description: "Религиозный варвар, чья вера подпитывает его боевой дух."
      }
    ]
  }
];

const Classes = () => {
  const [selectedClass, setSelectedClass] = useState(null);

  return (
    <div className="class-container">
      <div className="class-button-container">
        {classData.map((charClass) => (
          <button
            key={charClass.id}
            className={selectedClass?.id === charClass.id ? "class-button active" : "class-button"}
            onClick={() => setSelectedClass(charClass)}
          >
            {charClass.name}
          </button>
        ))}
      </div>

      <div className="class-details">
        {selectedClass ? (
          <Class charClass={selectedClass} />
        ) : (
          <p>Выберите класс, чтобы увидеть его описание.</p>
        )}
      </div>
    </div>
  );
};

export default Classes;