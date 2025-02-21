import React, { useState } from "react";
import { db } from "../../firebase/firebaseConfig"; // Путь к вашему файлу с конфигурацией Firebase
import { collection, addDoc, deleteDoc, getDocs } from "firebase/firestore";
import * as XLSX from "xlsx"; // Библиотека для работы с Excel

const DndDataUploader = () => {
  const [spellsFile, setSpellsFile] = useState(null);
  const [racesFile, setRacesFile] = useState(null);
  const [classesFile, setClassesFile] = useState(null);

  // Обработчики выбора файлов
  const handleFileChange = (event, setter) => {
    setter(event.target.files[0]);
  };

  // Парсер Excel в JSON
  const parseExcel = async (file) => {
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const json = XLSX.utils.sheet_to_json(sheet);
    return json;
  };

  // Очистка коллекции в Firestore
  const clearCollection = async (collectionName) => {
    const collectionRef = collection(db, collectionName);
    const snapshot = await getDocs(collectionRef);
    for (const doc of snapshot.docs) {
      await deleteDoc(doc.ref);
    }
    console.log(`Коллекция ${collectionName} очищена.`);
  };

  // Загрузка данных в Firestore
  const uploadData = async (file, collectionName) => {
    if (!file) {
      console.error(`Файл для ${collectionName} не выбран`);
      return;
    }

    try {
      // Парсинг Excel в JSON
      const jsonData = await parseExcel(file);

      // Очистка старых данных
      await clearCollection(collectionName);

      // Добавление новых данных
      const collectionRef = collection(db, collectionName);
      for (const item of jsonData) {
        await addDoc(collectionRef, item);
        console.log(`Добавлено в ${collectionName}: `, item);
      }

      console.log(`Все данные успешно загружены в ${collectionName}!`);

      // Лог данных
      await logCollectionContents(collectionName);
    } catch (error) {
      console.error(`Ошибка при загрузке данных в ${collectionName}: `, error);
    }
  };

  // Лог данных из Firestore
  const logCollectionContents = async (collectionName) => {
    const collectionRef = collection(db, collectionName);
    const snapshot = await getDocs(collectionRef);

    console.log(`Содержимое коллекции ${collectionName}:`);
    snapshot.docs.forEach((doc) => {
      console.log(doc.data());
    });
  };

  return (
    <div>
      <h2>Загрузка данных DnD</h2>
      <div>
        <h3>Загрузить заклинания</h3>
        <input type="file" accept=".xlsx, .xls" onChange={(e) => handleFileChange(e, setSpellsFile)} />
        <button onClick={() => uploadData(spellsFile, "spells")} disabled={!spellsFile}>
          Загрузить заклинания в Firestore
        </button>
      </div>

      <div>
        <h3>Загрузить расы</h3>
        <input type="file" accept=".xlsx, .xls" onChange={(e) => handleFileChange(e, setRacesFile)} />
        <button onClick={() => uploadData(racesFile, "races")} disabled={!racesFile}>
          Загрузить расы в Firestore
        </button>
      </div>

      <div>
        <h3>Загрузить классы</h3>
        <input type="file" accept=".xlsx, .xls" onChange={(e) => handleFileChange(e, setClassesFile)} />
        <button onClick={() => uploadData(classesFile, "classes")} disabled={!classesFile}>
          Загрузить классы в Firestore
        </button>
      </div>
    </div>
  );
};

export default DndDataUploader;
