import React, { useState } from "react";
import "./Header.css";
import ProfileMenu from "../UsersComponents/ProfileMenu/ProfileMenu";
import Modal from "../Modal/Modal";
import RegistrationForm from "../UsersComponents/RegistrationForm/RegistrationForm";
import LoginForm from "../UsersComponents/LoginForm/LoginForm";

const Header = ({ resetCategory, isAuthenticated, user, onCollectionSelect }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // Тип модального окна ("signup" или "signin")

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
    setIsModalOpen(false);
    console.log("User authenticated:", userData);
  };

  return (
    <>
      <header className="header">
        <div className="header__left">
          <span
            className="header__title"
            onClick={resetCategory}
            style={{ cursor: "pointer" }}
          >
            DND Multiverse
          </span>
          <input
            type="text"
            className="header__search"
            placeholder="Search..."
          />
        </div>
        <div className="header__auth">
          {isAuthenticated ? (
            <ProfileMenu user={user} onCollectionSelect={onCollectionSelect} />
          ) : (
            <>
              <button className="auth__button" onClick={handleSignUpClick}>
                Sign Up
              </button>
              <button className="auth__button" onClick={handleSignInClick}>
                Sign In
              </button>
            </>
          )}
        </div>
      </header>
      <Modal isVisible={isModalOpen} onClose={handleCloseModal}>
        {modalType === "signup" ? (
          <RegistrationForm onUserAuthenticated={handleUserAuthenticated} />
        ) : (
          <LoginForm onUserAuthenticated={handleUserAuthenticated} />
        )}
      </Modal>
    </>
  );
};

export default Header;