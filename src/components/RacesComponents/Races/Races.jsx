import React, { useState, useEffect } from "react";
import { db } from "../../../firebase/firebaseConfig"; // Путь к Firebase
import { collection, getDocs } from "firebase/firestore";
import Race from "../Race/Race";
import "./Races.css";
import aasimarImage from "../../../img/aasimar.jpg";
import dragonbornImage from "../../../img/dragonborn.png";
import dwarfImage from "../../../img/dwarf.jpeg";
import elfImage from "../../../img/elf.png";
import gnomeImage from "../../../img/gnome.png";
import goliathImage from "../../../img/goliath.png";
import halflingImage from "../../../img/halfling.png";
import humanImage from "../../../img/human.jpg";
import orcImage from "../../../img/orc.png";
import tieflingImage from "../../../img/tiefling.png";

const Races = () => {
  const [races, setRaces] = useState([]); // Список всех рас
  const [selectedRace, setSelectedRace] = useState(null); // Выбранная раса
  const [loading, setLoading] = useState(true); // Флаг загрузки данных

  const raceImages = {
    aasimar: aasimarImage,
    dragonborn: dragonbornImage,
    dwarf: dwarfImage,
    elf: elfImage,
    gnome: gnomeImage,
    goliath: goliathImage,
    halfling: halflingImage,
    human: humanImage,
    orc: orcImage,
    tiefling: tieflingImage,
  };

  const raceImageSrc =
    raceImages[selectedRace?.title?.toLowerCase()] ||
    `https://via.placeholder.com/300x200?text=${encodeURIComponent(
      selectedRace?.titleRus || selectedRace?.title
    )}`;

  useEffect(() => {
    const fetchRaces = async () => {
      try {
        const racesCollection = collection(db, "races");
        const racesSnapshot = await getDocs(racesCollection);
        const racesList = racesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRaces(racesList);
      } catch (error) {
        console.error("Ошибка при загрузке рас:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRaces();
  }, []);

  return (
    <div className="race-container">
      {loading ? (
        <p>Загрузка рас...</p>
      ) : (
        <>
          <div className="race-button-container">
            {races.map((race) => (
              <button
                key={race.id}
                className={
                  selectedRace?.id === race.id
                    ? "race-button active"
                    : "race-button"
                }
                onClick={() => setSelectedRace(race)}
              >
                {race.titleRus || race.title}
              </button>
            ))}
          </div>

          <div className="race-details">
            {selectedRace ? (
              <>
                <Race race={selectedRace} />
                <div className="race-image">
                  <img
                    src={raceImageSrc}
                    alt={selectedRace?.titleRus || selectedRace?.title}
                  />
                </div>
              </>
            ) : (
              <div className="no-selection">
                <p>Выберите расу, чтобы увидеть её описание.</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Races;
