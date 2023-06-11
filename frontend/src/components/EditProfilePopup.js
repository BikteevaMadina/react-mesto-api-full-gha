import React, { useState, useEffect } from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ onClose, onUpdateUser, onLoading, isOpen }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: about,
    });
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeAbout(e) {
    setAbout(e.target.value);
  }
  return (
    <PopupWithForm
      name="profile-form"
      title="Редактировать профиль"
      buttonValue="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={onLoading ? `Сохранение` : `Сохранить`}
    >
      <label className="popup__label">
        <input
          className="popup__input popup__input_post_name"
          placeholder="Ваше имя"
          id="post-name"
          type="text"
          name="name"
          maxLength="40"
          minLength="2"
          required
          value={name || ""}
          onChange={handleChangeName}
        />
        <span
          className="popup__error post-name-error"
          id="post-name-error"
        ></span>
      </label>
      <label className="popup__label">
        <input
          className="popup__input popup__input_post_activity"
          placeholder="Область деятельности"
          id="post-activity"
          type="text"
          name="info"
          maxLength="200"
          minLength="2"
          required
          value={about || ""}
          onChange={handleChangeAbout}
        />
        <span
          id="post-activity-error"
          className="popup__error post-activity-error"
        ></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
