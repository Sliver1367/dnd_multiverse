import React, { useState } from "react";
import { db } from "../../firebase/firebaseConfig"; // Путь к вашему файлу с конфигурацией Firebase
import { collection, addDoc, deleteDoc, getDocs } from "firebase/firestore";
import * as XLSX from "xlsx"; // Библиотека для работы с Excel

const DndDataUploader = () => {
  const [file, setFile] = useState(null);

  // Обработчик загрузки файла
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
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

  // Очистка базы данных
  const clearDatabase = async () => {
    const spellsCollection = collection(db, "spells");
    const spellsSnapshot = await getDocs(spellsCollection);

    for (const doc of spellsSnapshot.docs) {
      await deleteDoc(doc.ref);
    }
  };

  // Загрузка данных в Firebase
  const uploadData = async () => {
    if (!file) {
      console.error("Файл не выбран");
      return;
    }

    try {
      // Парсинг Excel в JSON
      const jsonData = await parseExcel(file);

      // Сброс базы данных
      await clearDatabase();

      // Загрузка новых данных
      const spellsCollection = collection(db, "spells");
      for (const spell of jsonData) {
        await addDoc(spellsCollection, spell);
        console.log(`Заклинание "${spell.title}" добавлено в базу данных!`);
      }

      console.log("Все данные успешно загружены!");

      // Вывод данных из базы для проверки
      await logDatabaseContents();
    } catch (error) {
      console.error("Ошибка при загрузке данных: ", error);
    }
  };

  // Чтение и вывод данных из Firestore
  const logDatabaseContents = async () => {
    const spellsCollection = collection(db, "spells");
    const spellsSnapshot = await getDocs(spellsCollection);

    console.log("Содержимое базы данных:");
    spellsSnapshot.docs.forEach((doc) => {
      console.log(doc.data());
    });
  };

  return (
    <div>
      <p>Загрузить данные о заклинаниях</p>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
      <button onClick={uploadData} disabled={!file}>
        Загрузить заклинания в Firestore
      </button>
    </div>
  );
};

export default DndDataUploader;