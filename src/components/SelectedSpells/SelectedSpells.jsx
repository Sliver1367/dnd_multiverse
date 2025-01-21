import React, { useState, useEffect } from "react";
import PrintSpells from "../PrintSpells/PrintSpells";
import Modal from "../Modal/Modal";
import "./SelectedSpells.css";
import { db } from "../../firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { auth } from "../../firebase/firebaseConfig";

const SelectedSpells = ({ selectedSpells, onResetSpells, onRemoveSpell }) => {
  const [isPrintVisible, setPrintVisible] = useState(false);
  const [isSaving, setSaving] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [collectionName, setCollectionName] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  const handlePrintSpells = () => setPrintVisible(true);

  const handleClosePrint = () => setPrintVisible(false);

  const handleSaveSpells = () => {
    if (selectedSpells.length === 0 || !isLoggedIn) return;
    setModalOpen(true); // Открываем модалку для выбора названия
  };

  const handleSaveCollection = async () => {
    if (!collectionName.trim()) {
      alert("Введите название коллекции!");
      return;
    }
  
    setSaving(true);
    try {
      const spellsCollection = collection(db, "userSpells");
      await addDoc(spellsCollection, {
        spells: selectedSpells,
        collectionName: collectionName.trim(),
        userId: auth.currentUser.uid,
        timestamp: new Date(),
      });
      alert("Коллекция успешно сохранена!");
      setModalOpen(false);
      setCollectionName("");
      // Теперь `onSnapshot` в `ProfileMenu` автоматически обновит данные
    } catch (error) {
      console.error("Ошибка при сохранении коллекции:", error);
      alert("Не удалось сохранить коллекцию.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="selected-spells">
        <h2>Выбранные заклинания:</h2>
        {selectedSpells.length === 0 ? (
          <p>Нет выбранных заклинаний</p>
        ) : (
          <ul>
            {selectedSpells.map((spell) => (
              <li key={spell.titleRus} className="spell-item">
                <span>{spell.titleRus}</span>
                <button
                  className="remove-button"
                  onClick={() => onRemoveSpell(spell)}
                  aria-label="Удалить заклинание"
                >
                  &times;
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="buttons-container">
        <button
          className="reset-button"
          onClick={onResetSpells}
          disabled={selectedSpells.length === 0}
        >
          Сбросить выбранные
        </button>
        <button
          className="print-button"
          onClick={handlePrintSpells}
          disabled={selectedSpells.length === 0}
        >
          Сохранить в PDF
        </button>
        <button
          className={`save-button ${
            !isLoggedIn || selectedSpells.length === 0 ? "disabled" : ""
          }`}
          onClick={handleSaveSpells}
          disabled={!isLoggedIn || selectedSpells.length === 0 || isSaving}
        >
          {isSaving ? "Сохранение..." : "Сохранить в коллекцию"}
        </button>
      </div>
      <Modal isVisible={isModalOpen} onClose={() => setModalOpen(false)}>
        <div className="save-collection-modal">
          <h3>Введите название коллекции:</h3>
          <input
            type="text"
            value={collectionName}
            onChange={(e) => setCollectionName(e.target.value)}
            placeholder="Название коллекции"
          />
          <button
            className="save-collection-button"
            onClick={handleSaveCollection}
            disabled={isSaving}
          >
            {isSaving ? "Сохранение..." : "Сохранить"}
          </button>
        </div>
      </Modal>
      <Modal isVisible={isPrintVisible} onClose={handleClosePrint}>
        <PrintSpells spells={selectedSpells} />
      </Modal>
    </div>
  );
};

export default SelectedSpells;
