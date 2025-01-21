import React, { useState, useEffect } from "react";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import "./ProfileMenu.css";

const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  const auth = getAuth();

  // Следим за изменением состояния авторизации
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          displayName: currentUser.displayName || "User",
          email: currentUser.email,
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out successfully");
        setUser(null); // Сбрасываем данные пользователя
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  return (
    <div className="profile-menu">
      <button className="profile-menu__button" onClick={toggleMenu}>
        {user?.displayName || "Profile"}
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