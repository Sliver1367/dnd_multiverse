import React, { useState } from "react";
import "./Categories.css";

const Categories = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  const categories = [
    {
      name: "Персонажи",
      subcategories: ["Мои персонажи", "Создание персонажей"],
    },
    { name: "Заклинания", subcategories: ["Мои заклинания", "Поиск"] },
    { name: "Расы", subcategories: [] },
    { name: "Классы", subcategories: [] }
  ];

  const toggleSubcategories = (categoryName) => {
    setActiveCategory((prev) => (prev === categoryName ? null : categoryName));
  };

  return (
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
            onClick={() => toggleSubcategories(category.name)}
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
                <button key={sub} className="subcategory__button">
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
