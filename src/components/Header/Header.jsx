import React from "react";
import "./Header.css";
import DndDataUploader from "../BDDataUploader/BDDataUploader"


const Header = () => {
  return (
    <header className="header">
      <div className="header__left">
        <span className="header__title">DND Multiverse</span>
        <input
          type="text"
          className="header__search"
          placeholder="Search..."
        />
      </div>
      <DndDataUploader/>
      <div className="header__auth">
        <button className="auth__button">Sign In</button>
        <button className="auth__button">Sign Up</button>
      </div>
    </header>
  );
};

export default Header;

  