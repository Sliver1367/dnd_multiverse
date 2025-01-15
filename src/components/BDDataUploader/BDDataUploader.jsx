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
    "castingTime": "Action",
    "castingTimeRus": "Действие",
    "rangeFt": "60",
    "componentV": "TRUE",
    "componentS": "TRUE",
    "componentM": null,
    "componentMRus": null,
    "duration": "Instantaneous",
    "durationRus": "Мгновенно",
    "description": "You create an acid bubble...",
    "school": "Evocation",
    "classWizard": "TRUE"
  },
  // Другие объекты заклинаний
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
