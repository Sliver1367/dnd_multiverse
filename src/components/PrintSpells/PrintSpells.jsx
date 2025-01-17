import React from "react";
import SpellCard from "../SpellCard/SpellCard";
import "./PrintSpells.css";

const PrintSpells = ({ spells }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="print-spells">
      <div className="spells-grid">
        {spells.map((spell, index) => (
          <SpellCard key={index} spell={spell} />
        ))}
      </div>
      <button className="print-page-button" onClick={handlePrint}>
        Отправить на печать
      </button>
    </div>
  );
};

export default PrintSpells;