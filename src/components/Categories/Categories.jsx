import React, { useState } from "react";
import "./Categories.css";

const Categories = ({ onCategorySelect }) => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubcategory, setActiveSubcategory] = useState(null);

  const categories = [
    { name: "Персонажи", subcategories: [] },
    { name: "Заклинания", subcategories: [] },
    {
      name: "Справочник",
      subcategories: [
        "Расы",
        "Классы",
        "Предыстории",
        "Черты",
        "Инвентарь",
        "Правила",
      ],
    },
    { name: "Бестиарий", subcategories: [] },
    {
      name: "Инструменты мастера",
      subcategories: ["Магические предметы", "Бастионы", "Сокровища"],
    },
  ];

  const handleCategoryClick = (category) => {
    if (category.name === activeCategory) {
      setActiveCategory(null);
      setActiveSubcategory(null);
      onCategorySelect(null, null);
    } else {
      setActiveCategory(category.name);
      setActiveSubcategory(null);

      // Если нет подкатегорий, сразу переключаем экран
      if (category.subcategories.length === 0) {
        onCategorySelect(category.name, null);
      }
    }
  };

  const handleSubcategoryClick = (subcategory) => {
    setActiveSubcategory(subcategory);

    // Скрываем список подкатегорий после выбора
    setActiveCategory(null);

    onCategorySelect(activeCategory, subcategory);
  };

  return (
    <div className="categories">
      {categories.map((category) => (
        <div key={category.name} className="category">
          <button
            className={`category__button ${
              activeCategory === category.name ? "active" : ""
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            {category.subcategories.includes(activeSubcategory)
              ? activeSubcategory
              : category.name}
          </button>
          {category.subcategories.length > 0 &&
            activeCategory === category.name && (
              <div className="subcategories">
                {category.subcategories.map((sub) => (
                  <button
                    key={sub}
                    className={`subcategory__button ${
                      activeSubcategory === sub ? "active" : ""
                    }`}
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
  );
};

export default Categories;
