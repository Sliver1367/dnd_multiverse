import React from "react";
import AllSpells from "../AllSpells/AllSpells"; // Импортируем компонент со всеми заклинаниями

const Workscreen = ({ activeCategory, activeSubcategory }) => {
  const renderContent = () => {
    if (activeCategory === "Заклинания" && activeSubcategory === "Все заклинания") {
      return <AllSpells />; // Отображаем компонент со всеми заклинаниями
    }

    if (activeCategory === "Заклинания" && activeSubcategory === "Поиск") {
      return <div>Функция поиска заклинаний</div>; // Отображаем заглушку для поиска
    }

    switch (activeCategory) {
      case "Персонажи":
        return <div>Контент для персонажей</div>;
      case "Инвентарь":
        return <div>Контент для инвентаря</div>;
      case "Бестиарий":
        return <div>Контент для бестиария</div>;
      // Добавьте остальные категории по аналогии
      default:
        return <div>Выберите категорию и подкатегорию</div>;
    }
  };

  return <div>{renderContent()}</div>;
};

export default Workscreen;