import React, { useState, useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import { db } from "../../firebase/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import "./ProfileMenu.css";

const ProfileMenu = ({ user, onCollectionSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userCollections, setUserCollections] = useState([]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => console.log("User signed out successfully"))
      .catch((error) => console.error("Error signing out:", error));
  };

  useEffect(() => {
    const fetchUserCollections = async () => {
      if (!user) return;

      const q = query(
        collection(db, "userSpells"),
        where("userId", "==", user.uid)
      );

      try {
        const querySnapshot = await getDocs(q);
        const collections = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUserCollections(collections);
      } catch (error) {
        console.error("Ошибка загрузки коллекций:", error);
      }
    };

    fetchUserCollections();
  }, [user]);

  const handleCollectionSelect = (collection) => {
    // Передаем заклинания и устанавливаем активную категорию "Заклинания"
    onCollectionSelect(collection.spells, "Заклинания");
    setIsOpen(false);
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
          <li className="profile-menu__item">
            <h3>Мои коллекции:</h3>
            {userCollections.length > 0 ? (
              <ul>
                {userCollections.map((collection) => (
                  <li
                    key={collection.id}
                    className="profile-menu__item"
                    onClick={() => handleCollectionSelect(collection)}
                  >
                    {collection.collectionName} ({collection.spells.length} заклинаний)
                  </li>
                ))}
              </ul>
            ) : (
              <p>Нет сохранённых коллекций</p>
            )}
          </li>
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