import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Categories from "../Categories/Categories";
import Workscreen from "../Workscreen/Workscreen";
import Footer from "../Footer/Footer";
import Modal from "../Modal/Modal";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import LoginForm from "../LoginForm/LoginForm"; // Новый компонент для логина
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import "./DndMultiverse.css";


const DndMultiverse = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // Тип модального окна ("signup" или "signin")
  const [user, setUser] = useState(null);

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
  };

  const handleSignUpClick = () => {
    setModalType("signup");
    setIsModalOpen(true);
  };

  const handleSignInClick = () => {
    setModalType("signin");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleUserAuthenticated = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    setIsModalOpen(false);
  };

  return (
    <div className="app">
      <Header
        resetCategory={resetCategory}
        isAuthenticated={isAuthenticated}
        user={user}
        onSignUpClick={handleSignUpClick}
        onSignInClick={handleSignInClick} // Новый обработчик для Sign In
      />
      <Categories onCategorySelect={handleCategorySelect} />
      <div className="workscreen">
        <Workscreen
          activeCategory={selectedCategory}
          activeSubcategory={selectedSubcategory}
        />
      </div>
      <Footer />
      <Modal isVisible={isModalOpen} onClose={handleCloseModal}>
        {modalType === "signup" ? (
          <RegistrationForm onUserAuthenticated={handleUserAuthenticated} />
        ) : (
          <LoginForm onUserAuthenticated={handleUserAuthenticated} />
        )}
      </Modal>
    </div>
  );
};

export default DndMultiverse;