import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "./LoginForm.css";

const LoginForm = ({ onUserAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        onUserAuthenticated({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || "User",
        });
      })
      .catch((error) => {
        setError("Invalid email or password");
        console.error("Login error:", error);
      });
  };

  return (
    <form className="login-form" onSubmit={handleLogin}>
      <h2>Sign In</h2>
      {error && <p className="login-form__error">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" className="login-form__button">
        Login
      </button>
    </form>
  );
};

export default LoginForm;