import React, { useState, useEffect } from "react";
import { db } from "../../../firebase/firebaseConfig"; // Путь к Firebase
import { collection, getDocs } from "firebase/firestore";
import ClassDetails from "../ClassDetails/ClassDetails";
import "./Classes.css";

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const classesCollection = collection(db, "classes");
        const classesSnapshot = await getDocs(classesCollection);
        const classesList = classesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setClasses(classesList);
      } catch (error) {
        console.error("Ошибка при загрузке классов:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  return (
    <div className="class-container">
      {loading ? (
        <p>Загрузка классов...</p>
      ) : (
        <>
          <div className="class-button-container">
            {classes.map((charClass) => (
              <button
                key={charClass.id}
                className={
                  selectedClass?.id === charClass.id
                    ? "class-button active"
                    : "class-button"
                }
                onClick={() => setSelectedClass(charClass)}
              >
                {charClass.name}
              </button>
            ))}
          </div>

          <div className="class-details">
            {selectedClass ? (
              <ClassDetails charClass={selectedClass} />
            ) : (
              <p>Выберите класс, чтобы увидеть его описание.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Classes;