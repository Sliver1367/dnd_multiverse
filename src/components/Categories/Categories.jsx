import React from "react";

const Categories = () => {
  const categories = [
    {
      name: "Персонажи",
      subcategories: ["Мои персонажи", "Создание персонажей"],
    },
    { name: "Заклинания", subcategories: ["Мои заклинания", "Поиск"] },
    { name: "Расы", subcategories: [] },
    { name: "Классы", subcategories: [] },
  ];

  return (
    <div className="categories">
      {categories.map((category) => (
        <div key={category.name}>
          <button>{category.name}</button>
          {
            <div className="subcategories">
              {category.subcategories.map((sub) => (
                <button>{sub}</button>
              ))}
            </div>
          }
        </div>
      ))}
    </div>
  );
};

export default Categories;
