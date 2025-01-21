import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Categories from "../Categories/Categories";
import Workscreen from "../Workscreen/Workscreen";
import Footer from "../Footer/Footer";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./DndMultiverse.css";

const DndMultiverse = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [selectedSpells, setSelectedSpells] = useState([]);

  // Отслеживание состояния авторизации пользователя
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName || "User",
        });
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    });
    return () => unsubscribe(); // Отписываемся при размонтировании компонента
  }, []);

  const handleCategorySelect = (category, subcategory) => {
    setSelectedCategory(category);
    setSelectedSubcategory(subcategory);
  };

  const resetCategory = () => {
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    setSelectedSpells([]);
  };

  const handleCollectionSelect = (spells, category) => {
    setSelectedSpells(spells);
    setSelectedCategory(category); // Устанавливаем категорию "Заклинания"
    setSelectedSubcategory(null);
  };

  return (
    <div className="app">
      <Header
        resetCategory={resetCategory}
        isAuthenticated={isAuthenticated}
        user={user}
        onCollectionSelect={handleCollectionSelect}
      />
      <Categories onCategorySelect={handleCategorySelect} />
      <div className="workscreen">
        <Workscreen
          activeCategory={selectedCategory}
          activeSubcategory={selectedSubcategory}
          selectedSpells={selectedSpells}
        />
      </div>
      <Footer />
    </div>
  );
};

export default DndMultiverse;