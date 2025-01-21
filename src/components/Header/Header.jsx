import React from "react";
import "./Header.css";
import ProfileMenu from "../ProfileMenu/ProfileMenu";

const Header = ({ resetCategory, isAuthenticated, user, onSignUpClick, onSignInClick }) => {
  return (
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
          <ProfileMenu user={user} />
        ) : (
          <>
            <button className="auth__button" onClick={onSignUpClick}>
              Sign Up
            </button>
            <button className="auth__button" onClick={onSignInClick}>
              Sign In
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;