import React, { useState } from "react";
import "./Categories.css";
import Workscreen from "../Workscreen/Workscreen"; // Импортируем Workscreen

const Categories = () => {
  const [activeCategory, setActiveCategory] = useState(null); // Активная категория
  const [activeSubcategory, setActiveSubcategory] = useState(null); // Активная подкатегория

  const categories = [
    {
      name: "Персонажи",
      subcategories: ["Мои персонажи", "Создание персонажей"],
    },
    { name: "Заклинания", subcategories: ["Все заклинания", "Поиск"] },
    { name: "Инвентарь", subcategories: [] },
    { name: "Бестиарий", subcategories: [] },
    { name: "Расы", subcategories: [] },
    { name: "Классы", subcategories: [] },
    { name: "Черты", subcategories: [] },
    { name: "Предыстории", subcategories: [] },
    { name: "Инструменты Мастера", subcategories: ["Бастионы"] },
  ];

  const handleCategoryClick = (categoryName) => {
    setActiveCategory(categoryName); // Устанавливаем активную категорию
    setActiveSubcategory(null); // Сбрасываем подкатегорию
  };

  const handleSubcategoryClick = (subcategoryName) => {
    setActiveSubcategory(subcategoryName); // Устанавливаем активную подкатегорию
  };

  return (
    <div className="app">
      <div className="categories">
        {categories.map((category) => (
          <div
            key={category.name}
            className={`category ${
              activeCategory === category.name ? "active" : ""
            }`}
          >
            <button
              className="category__button"
              onClick={() => handleCategoryClick(category.name)}
            >
              {category.name}
            </button>
            {category.subcategories.length > 0 && (
              <div
                className={`subcategories ${
                  activeCategory === category.name ? "visible" : ""
                }`}
              >
                {category.subcategories.map((sub) => (
                  <button
                    key={sub}
                    className="subcategory__button"
                    onClick={() => handleSubcategoryClick(sub)}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="workscreen">
        <Workscreen
          activeCategory={activeCategory}
          activeSubcategory={activeSubcategory}
        />
      </div>
    </div>
  );
};

export default Categories;