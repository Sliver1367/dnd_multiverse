import React, { useState } from "react";
import "./SpellCard.css";

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

const SpellCard = ({ spell, isSelected, onSelect }) => {
  const [currentPage, setCurrentPage] = useState(0); // Для переключения страниц

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

  // Общее количество страниц (включает текстовые части + доп. материал)
  const totalPages = descriptionParts.length + (spell.dopMaterial ? 1 : 0);

  // Обработчики переключения страниц
  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  const handlePreviousPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 0));

  return (
    <div
      className={`spell-card ${isSelected ? "selected" : ""}`}
      style={{
        boxShadow: isSelected ? "0 8px 16px rgba(0, 0, 0, 0.2)" : "none",
        transform: isSelected ? "scale(1.03)" : "none",
        borderWidth: isSelected ? "3px" : "2px",
      }}
    >
      <div className="spell-card__header">
        <h1 className="title">{spell.titleRus}</h1>
        <p>
          {spell.level} уровень - {spell.schoolRus || spell.school}
        </p>
      </div>
      {/* Первая страница с таблицей и описанием */}
      {currentPage === 0 && (
        <>
          <div className="spell-card__details">
            <div className="spell-card__mini-table">
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
          <div className="spell-card__description">
            <div
              dangerouslySetInnerHTML={{
                __html: descriptionParts[currentPage],
              }}
            />
          </div>
        </>
      )}
      {currentPage === 0 && spell.onHigherLevelRus && (
        <div className="spell-card__higher-level">
          <h3>На более высоких уровнях</h3>
          <p>{spell.onHigherLevelRus}</p>
        </div>
      )}
      {/* Описание на следующих страницах */}
      {currentPage > 0 && currentPage < descriptionParts.length && (
        <div className="spell-card__description">
          <div
            dangerouslySetInnerHTML={{
              __html: descriptionParts[currentPage],
            }}
          />
        </div>
      )}
      {/* Последняя страница - Дополнительные материалы */}
      {currentPage === descriptionParts.length && spell.dopMaterial && (
        <div className="spell-card__dop-material">
          <h3>Дополнительные материалы</h3>
          <p>{spell.dopMaterial}</p>
        </div>
      )}
      <div className="spell-card__footer">
        {/* Кнопка назад */}
        {currentPage > 0 && (
          <button
            className="spell-card__nav-button"
            onClick={handlePreviousPage}
          >
            ←
          </button>
        )}
        <button
          className={`spell-card__select-button ${
            isSelected ? "selected" : ""
          }`}
          onClick={onSelect}
        >
          {isSelected ? "Отменить выбор" : "Выбрать"}
        </button>
        {/* Кнопка вперёд */}
        {currentPage < totalPages - 1 && (
          <button className="spell-card__nav-button" onClick={handleNextPage}>
            →
          </button>
        )}
      </div>
    </div>
  );
};

export default SpellCard;
