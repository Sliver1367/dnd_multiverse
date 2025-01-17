import React from "react";
import SpellCardToPrint from "../SpellCardToPrint/SpellCardToPrint";
import "./SpellPage.css";

const SpellPage = ({ spells, pageIndex }) => {
  return (
    <div className="spell-page" id={`page-${pageIndex}`}>
      {spells.map((spell, index) =>
        spell ? (
          <SpellCardToPrint key={index} spell={spell} />
        ) : (
          <div key={index} className="spell-card-print empty-card" />
        )
      )}
    </div>
  );
};

export default SpellPage;
