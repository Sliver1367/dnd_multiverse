import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import "./RegistrationForm.css";


const RegistrationForm = ({ onUserAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => password.length >= 6;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Invalid email format");
      return;
    }
    if (!validatePassword(password)) {
      setError("Password must be at least 6 characters long");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const auth = getAuth();
    try {
      // Создаём пользователя
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Обновляем профиль пользователя
      await updateProfile(user, {
        displayName: username,
      });

      // Повторно получаем обновлённого пользователя
      const updatedUser = auth.currentUser;

      // Передаём обновлённые данные пользователя
      onUserAuthenticated({
        email: updatedUser.email,
        username: updatedUser.displayName,
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form className="registration-form" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      {error && <p className="error">{error}</p>}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
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
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;