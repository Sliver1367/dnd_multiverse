// src/components/DndDataUploader.js
import React from "react";
import { db } from "../../firebase/firebaseConfig"; // Путь к вашему файлу с конфигурацией Firebase
import { collection, addDoc } from "firebase/firestore";

// Массив заклинаний (данные для загрузки)
const spells = [
  {
    "№": "1",
    "title": "Acid Splash",
    "titleRus": "Кислотный Всплеск",
    "level": "0",
    "ritual": "FALSE",
    "castingTime": "Action",
    "castingTimeRus": "Действие",
    "rangeFt": "60",
    "componentV": "TRUE",
    "componentS": "TRUE",
    "componentM": "",
    "componentMRus": "",
    "concentration": "FALSE",
    "duration": "FALSE",
    "durationRus": "Мгновенно",
    "description": "You create an acid bubble at a point within range, where it explodes in a 5-foot-radius Sphere. Each creature in that Sphere must succeed on a Dexterity saving throw or take 1d6 Acid damage.",
    "descriptionRus": "Вы бросаете кислотный шарик в точку в пределах дальности, где он взрывается сферой с радиусом 5 футов. Каждое существо в этой сфере должно преуспеть в спаброске Ловкости или получить 1к6 урона кислотой.",
    "onHigherLevel": "The damage increases by 1d6 when you reach levels 5 (2d6), 11 (3d6), and 17 (4d6).",
    "onHigherLevelRus": "Урон увеличивается на 1к6, когда вы достигаете 5 уровня (2к6), 11 уровня (3к6) и 17 уровня (4к6).",
    "school": "Evocation",
    "schoolRus": "Созидания",
    "classBarbarian": "FALSE",
    "classBard": "FALSE",
    "classCleric": "FALSE",
    "classDruid": "FALSE",
    "classFighter": "FALSE",
    "classMonk": "FALSE",
    "classPaladin": "FALSE",
    "classRanger": "FALSE",
    "classRogue": "FALSE",
    "classSorcerer": "TRUE",
    "classWarlock": "FALSE",
    "classWizard": "TRUE"
}
];

const DndDataUploader = () => {
  // Функция для загрузки данных в Firebase
  const uploadData = async () => {
    const spellsCollection = collection(db, "spells");
    try {
      for (const spell of spells) {
        await addDoc(spellsCollection, spell);
        console.log(`Заклинание "${spell.title}" добавлено в базу данных!`);
      }
    } catch (error) {
      console.error("Ошибка при добавлении данных: ", error);
    }
  };

  return (
    <div>
      <p>Загрузить данные о заклинаниях</p>
      <button onClick={uploadData}>Загрузить заклинания в Firestore</button>
    </div>
  );
};

export default DndDataUploader;
