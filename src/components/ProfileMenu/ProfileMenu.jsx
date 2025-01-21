import React, { useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import "./ProfileMenu.css";

const ProfileMenu = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("User signed out successfully");
        // Здесь вы можете добавить логику для обработки выхода, например, перенаправление на главную страницу
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  return (
    <div className="profile-menu">
      <button className="profile-menu__button" onClick={toggleMenu}>
        {user?.displayName || user?.username || "Profile"}
      </button>
      {isOpen && (
        <ul className="profile-menu__list">
          <li className="profile-menu__item">My Profile</li>
          <li className="profile-menu__item">My Characters</li>
          <li className="profile-menu__item">My Spells</li>
          <li
            className="profile-menu__item profile-menu__logout"
            onClick={handleLogout}
          >
            Logout
          </li>
        </ul>
      )}
    </div>
  );
};

export default ProfileMenu;