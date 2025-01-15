import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./SelectedSpells.css";

const SelectedSpells = ({ selectedSpells }) => {
  const spellsRef = useRef();

  const generatePDF = async () => {
    const input = spellsRef.current;
    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 190;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
    pdf.save("selected_spells.pdf");
  };

  return (
    <div>
      <div ref={spellsRef} className="selected-spells">
        <h2>Выбранные заклинания:</h2>
        {selectedSpells.length === 0 ? (
          <p>Нет выбранных заклинаний</p>
        ) : (
          <ul>
            {selectedSpells.map((spell, index) => (
              <li key={index}>{spell.titleRus}</li>
            ))}
          </ul>
        )}
      </div>
      <button className="download-button" onClick={generatePDF}>
        Скачать PDF
      </button>
    </div>
  );
};

export default SelectedSpells;