import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";

function Register({ isLoggedIn, onRegister, title, buttonText, message }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handlePasswordAlter(evt) {
    setPassword(evt.target.value);
  }

  function handleEmailAlter(evt) {
    setEmail(evt.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    onRegister(email, password);
  }

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="auth__form"
      name="register"
      noValidate
    >
      <h2 className="auth__title">{title}</h2>
      <input
        id="email"
        name="email"
        type="email"
        value={email}
        className="auth__input"
        placeholder="Email"
        onChange={handleEmailAlter}
        autoComplete="off"
      />
      <input
        id="password"
        name="password"
        type="password"
        value={password}
        className="auth__input"
        placeholder="Пароль"
        onChange={handlePasswordAlter}
        autoComplete="off"
      />
      <div className="auth__container">
        <button className="auth__button" type="submit">
          {buttonText}
        </button>
        <Link to="/sign-in" className="auth__login-link">
          {message}
        </Link>
      </div>
    </form>
  );
}
export default Register;