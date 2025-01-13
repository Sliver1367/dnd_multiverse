import { observer } from "mobx-react";

function Categories({ store }) {
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
          <button onClick={() => store.setActiveCategory(category.name)}>
            {category.name}
          </button>
          {store.activeCategory === category.name && category.subcategories.length > 0 && (
            <div className="subcategories">
              {category.subcategories.map((sub) => (
                <button
                  key={sub}
                  onClick={() => store.setActiveSubcategory(sub)}
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
}

export default observer(Categories);
