import React from "react";
import "./SpellCardToPrint.css";

// Функция для поиска ближайшей границы (точки или запятой) перед лимитом
const findLastBoundary = (text, limit) => {
  const slicedText = text.slice(0, limit);
  const lastBoundaryIndex = Math.max(
    slicedText.lastIndexOf("."),
    slicedText.lastIndexOf(",")
  );
  return lastBoundaryIndex > -1
    ? slicedText.slice(0, lastBoundaryIndex + 1)
    : slicedText;
};

// Функция для разбиения текста с учетом границ
const splitDescriptionByBoundaries = (text, firstLimit, partLimit) => {
  const parts = [];
  let remainingText = text;

  // Первая часть
  const firstPart = findLastBoundary(remainingText, firstLimit);
  parts.push(firstPart);
  remainingText = remainingText.slice(firstPart.length);

  // Остальные части
  while (remainingText.length > 0) {
    const nextPart = findLastBoundary(remainingText, partLimit);
    parts.push(nextPart);
    remainingText = remainingText.slice(nextPart.length);
  }

  return parts;
};

const SpellCardToPrint = ({ spell, isSelected }) => {
  if (!spell) return null;

  // Определяем лимит длины текста для первой карточки
  const hasHigherLevelText = Boolean(spell.onHigherLevelRus);
  const hasLongComponents =
    spell.componentMRus && spell.componentMRus.length > 50;
  const firstCardDescriptionLimit =
    hasHigherLevelText || hasLongComponents ? 500 : 730;
  const additionalCardLimit = 1000;

  // Разбиваем текст на части
  const descriptionParts = splitDescriptionByBoundaries(
    spell.descriptionRus,
    firstCardDescriptionLimit,
    additionalCardLimit
  );

  // Добавляем дополнительный материал как отдельную часть
  if (spell.dopMaterial) {
    descriptionParts.push(`<h3>Дополнительные материалы</h3><p>${spell.dopMaterial}</p>`);
  }

  return (
    <>
      {descriptionParts.map((part, index) => (
        <div
          key={index}
          className={`spell-card-print ${isSelected ? "selected" : ""}`}
          style={{
            boxShadow: isSelected ? "0 8px 16px rgba(0, 0, 0, 0.2)" : "none",
            transform: isSelected ? "scale(1.03)" : "none",
            borderWidth: isSelected ? "3px" : "2px",
          }}
        >
          <div className="spell-card-print__header">
            <h1 className="title">{spell.titleRus}</h1>
            <p>
              {spell.level} уровень - {spell.schoolRus || spell.school}
            </p>
          </div>
          {/* Таблица только на первой карточке */}
          {index === 0 && (
            <div className="spell-card-print__details">
              <div className="spell-card-print__mini-table">
                <div>
                  <strong>Время использования:</strong>
                  <span>{spell.castingTimeRus}</span>
                </div>
                <div>
                  <strong>Дистанция:</strong>
                  <span>
                    {spell.rangeFt === "Self"
                      ? "На себя"
                      : spell.rangeFt === "Touch"
                      ? "Касание"
                      : `${spell.rangeFt} футов`}
                  </span>
                </div>
                <div>
                  <strong>Компоненты:</strong>
                  <span>
                    {spell.componentV && "В "}
                    {spell.componentS && "С "}
                    {spell.componentM && (
                      <span>
                        M{" "}
                        <div className="material-components">
                          ({spell.componentMRus})
                        </div>
                      </span>
                    )}
                  </span>
                </div>
                <div>
                  <strong>Длительность:</strong>
                  <span>{spell.durationRus}</span>
                </div>
              </div>
            </div>
          )}
          {/* Описание */}
          <div className="spell-card-print__description">
            <div
              dangerouslySetInnerHTML={{
                __html: part,
              }}
            />
          </div>
          {/* Секция "На более высоких уровнях", добавляем только на первой карточке */}
          {index === 0 && spell.onHigherLevelRus && (
            <div className="spell-card-print__higher-level">
              <h3>На более высоких уровнях</h3>
              <p>{spell.onHigherLevelRus}</p>
            </div>
          )}
          {/* Нумерация страниц, если их больше одной */}
          {descriptionParts.length > 1 && (
            <div className="spell-card-print__page-indicator">
              {index + 1}/{descriptionParts.length}
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default SpellCardToPrint;