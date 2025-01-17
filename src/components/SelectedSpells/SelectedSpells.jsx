import React, { useState } from "react";
import PrintSpells from "../PrintSpells/PrintSpells";
import Modal from "../Modal/Modal";
import "./SelectedSpells.css";

const SelectedSpells = ({ selectedSpells, onResetSpells, onRemoveSpell }) => {
  const [isPrintVisible, setPrintVisible] = useState(false);

  const handlePrintSpells = () => {
    setPrintVisible(true);
  };

  const handleClosePrint = () => {
    setPrintVisible(false);
  };

  return (
    <div>
      <div className="selected-spells">
        <h2>Выбранные заклинания:</h2>
        {selectedSpells.length === 0 ? (
          <p>Нет выбранных заклинаний</p>
        ) : (
          <ul>
            {selectedSpells.map((spell, index) => (
              <li key={index} className="spell-item">
                <span>{spell.titleRus}</span>
                <button
                  className="remove-button"
                  onClick={() => onRemoveSpell(index)}
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
          Печать заклинаний
        </button>
      </div>
      <Modal isVisible={isPrintVisible} onClose={handleClosePrint}>
        <PrintSpells spells={selectedSpells} />
      </Modal>
    </div>
  );
};

export default SelectedSpells;