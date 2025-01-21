import React, { useState, useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import { db } from "../../firebase/firebaseConfig";
import {
  collection,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import "./ProfileMenu.css";

const ProfileMenu = ({ user, onCollectionSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userCollections, setUserCollections] = useState([]);
  const [editingCollectionId, setEditingCollectionId] = useState(null);
  const [newName, setNewName] = useState("");

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => console.log("User signed out successfully"))
      .catch((error) => console.error("Error signing out:", error));
  };

  const fetchUserCollections = () => {
    if (!user) return;

    const q = query(
      collection(db, "userSpells"),
      where("userId", "==", user.uid)
    );

    // Слушатель данных для автоматического обновления
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const collections = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserCollections(collections);
    });

    return unsubscribe; // Возвращаем функцию для отписки
  };

  useEffect(() => {
    const unsubscribe = fetchUserCollections();
    return () => unsubscribe && unsubscribe();
  }, [user]);

  const handleCollectionSelect = (collection) => {
    onCollectionSelect(collection.spells, "Заклинания");
    setIsOpen(false);
  };

  const handleDeleteCollection = async (id) => {
    try {
      await deleteDoc(doc(db, "userSpells", id));
    } catch (error) {
      console.error("Ошибка при удалении коллекции:", error);
    }
  };

  const handleEditCollection = (id, name) => {
    setEditingCollectionId(id);
    setNewName(name);
  };

  const handleSaveEdit = async (id) => {
    try {
      await updateDoc(doc(db, "userSpells", id), { collectionName: newName });
      setEditingCollectionId(null);
    } catch (error) {
      console.error("Ошибка при обновлении коллекции:", error);
    }
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
            <h3>Мои заклинания:</h3>
            {userCollections.length > 0 ? (
              <ul>
                {userCollections.map((collection) => (
                  <li key={collection.id} className="profile-menu__collection">
                    {editingCollectionId === collection.id ? (
                      <div>
                        <input
                          type="text"
                          value={newName}
                          onChange={(e) => setNewName(e.target.value)}
                        />
                        <button onClick={() => handleSaveEdit(collection.id)}>
                          Сохранить
                        </button>
                      </div>
                    ) : (
                      <>
                        <span
                          onClick={() => handleCollectionSelect(collection)}
                        >
                          {collection.collectionName} (
                          {collection.spells.length})
                        </span>
                        <button
                          className="profile-menu__edit"
                          onClick={() =>
                            handleEditCollection(
                              collection.id,
                              collection.collectionName
                            )
                          }
                        >
                          ✏️
                        </button>
                        <button
                          className="profile-menu__delete"
                          onClick={() => handleDeleteCollection(collection.id)}
                        >
                          ❌
                        </button>
                      </>
                    )}
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