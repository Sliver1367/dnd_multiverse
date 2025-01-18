import React, { useState } from "react";
import SpellCardToPrint from "../SpellCardToPrint/SpellCardToPrint";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./PrintSpells.css";

const PrintSpells = ({ spells }) => {
  const [cardColor, setCardColor] = useState("#ae0707");

  const handleColorChange = (event) => {
    const newColor = event.target.value;
    setCardColor(newColor);
    document.documentElement.style.setProperty("--card-color", newColor);
    document.documentElement.style.setProperty("--card-title-color", newColor);
    document.documentElement.style.setProperty("--card-border-color", newColor);
  };

  const resetToBaseColor = () => {
    const baseColor = "#ae0707";
    setCardColor(baseColor);
    document.documentElement.style.setProperty("--card-color", baseColor);
    document.documentElement.style.setProperty("--card-title-color", baseColor);
    document.documentElement.style.setProperty("--card-border-color", baseColor);
  };

  const handlePrint = async () => {
    const containers = document.querySelectorAll(".spell-container");
    const pdfWidth = 2480;
    const pdfHeight = Math.floor(pdfWidth * 1.414);

    const pdf = new jsPDF("p", "px", [pdfWidth, pdfHeight]);

    for (let i = 0; i < containers.length; i++) {
      const container = containers[i];

      const cardCanvas = await html2canvas(container, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const cardImgData = cardCanvas.toDataURL("image/jpeg", 0.7);
      if (i > 0) {
        pdf.addPage();
      }
      pdf.addImage(cardImgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
    }

    pdf.save("spells.pdf");
  };

  const distributeCardsIntoContainers = (spells) => {
    const containers = [];
    let currentContainer = [];
    let currentCardCount = 0;

    spells.forEach((spell) => {
      const cardCount = calculateCardCount(spell);

      if (currentCardCount + cardCount > 9) {
        while (currentCardCount < 9) {
          currentContainer.push(null);
          currentCardCount++;
        }
        containers.push(currentContainer);
        currentContainer = [];
        currentCardCount = 0;
      }

      currentContainer.push(spell);
      currentCardCount += cardCount;
    });

    if (currentContainer.length > 0) {
      while (currentCardCount < 9) {
        currentContainer.push(null);
        currentCardCount++;
      }
      containers.push(currentContainer);
    }

    return containers;
  };

  const calculateCardCount = (spell) => {
    if (!spell) return 0;

    const descriptionLength = spell.descriptionRus?.length || 0;
    const additionalLength = spell.dopMaterial?.length || 0;

    const firstCardLimit = 730;
    const additionalCardLimit = 1000;

    const totalLength = descriptionLength + additionalLength;
    const cardCount = Math.ceil(
      (totalLength - firstCardLimit) / additionalCardLimit + 1
    );

    return Math.max(1, cardCount);
  };

  const containers = distributeCardsIntoContainers(spells);

  return (
    <div className="print-spells">
      <div className="print-options">
        <button onClick={handlePrint} className="print-button-pdf">
          Сохранить в PDF
        </button>
        <div className="color-picker-container">
          <label htmlFor="color-picker">Выберите цвет:</label>
          <input
            id="color-picker"
            type="color"
            value={cardColor}
            onChange={handleColorChange}
            className="color-picker"
            title="Выберите цвет карт"
          />
          <button onClick={resetToBaseColor} className="reset-color-button">
            Сбросить
          </button>
        </div>
      </div>
      <div id="print-container" className="print-container">
        {containers.map((container, containerIndex) => (
          <div key={containerIndex} className="spell-container">
            {container.map((spell, index) =>
              spell ? (
                <SpellCardToPrint key={index} spell={spell} />
              ) : (
                <div key={`placeholder-${index}`} className="spell-placeholder" />
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrintSpells;