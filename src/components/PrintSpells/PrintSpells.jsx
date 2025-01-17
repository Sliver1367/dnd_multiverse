import React from "react";
import SpellCardToPrint from "../SpellCardToPrint/SpellCardToPrint";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./PrintSpells.css";

const PrintSpells = ({ spells }) => {
  const handlePrint = async () => {
    const containers = document.querySelectorAll(".spell-container");
    const pdfWidth = 2480; // Ширина PDF
    const pdfHeight = Math.floor(pdfWidth * 1.414); // Высота PDF (A4 соотношение)
  
    const pdf = new jsPDF("p", "px", [pdfWidth, pdfHeight]); // Устанавливаем размер страницы
  
    for (let i = 0; i < containers.length; i++) {
      const container = containers[i];
      const canvas = await html2canvas(container, {
        scale: 2, // Уменьшаем масштаб для снижения объема данных
        useCORS: true,
      });
  
      const imgData = canvas.toDataURL("image/jpeg", 0.7); // Уменьшаем качество до 70% для JPEG
      if (imgData.length > 2 ** 21) {
        // Проверяем, что длина строки Base64 не превышает допустимый размер (2 МБ)
        console.warn(
          `Base64 string is too long (${imgData.length} characters). Reduce resolution or scale.`
        );
        alert("Ошибка: данные слишком велики для обработки. Попробуйте уменьшить разрешение.");
        return;
      }
  
      if (i > 0) {
        pdf.addPage(); // Добавляем новую страницу после первой
      }
      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight); // Используем JPEG для меньшего размера
    }
  
    pdf.save("spells.pdf"); // Сохраняем PDF
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
      <button onClick={handlePrint} className="print-button-pdf">
        Сохранить в PDF
      </button>
      <div id="print-container" className="print-container">
        {containers.map((container, containerIndex) => (
          <div key={containerIndex} className="spell-container">
            {container.map((spell, index) =>
              spell ? (
                <SpellCardToPrint key={index} spell={spell} />
              ) : (
                <div key={`placeholder-${index}`} className="spell-placeholder">
                  {/* Пустая карточка */}
                </div>
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrintSpells;