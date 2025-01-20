import React, { useState } from "react";
import Header from "../Header/Header";
import Categories from "../Categories/Categories";
import Workscreen from "../Workscreen/Workscreen";
import Footer from "../Footer/Footer";

const DndMultiverse = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  const handleCategorySelect = (category, subcategory) => {
    setSelectedCategory(category);
    setSelectedSubcategory(subcategory);
  };

  return (
    <div className="app">
      <Header />
      <Categories onCategorySelect={handleCategorySelect} />
      <div className="workscreen">
        <Workscreen activeCategory={selectedCategory} activeSubcategory={selectedSubcategory} />
      </div>
      <Footer />
    </div>
  );
};

export default DndMultiverse;