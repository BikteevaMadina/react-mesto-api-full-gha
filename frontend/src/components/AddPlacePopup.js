import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, onLoading }) {
  const [placeName, setPlaceName] = useState("");
  const [placeLink, setPlaceLink] = useState("");

  useEffect(() => {
    setPlaceName("");
    setPlaceLink("");
  }, [isOpen]);
  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: placeName,
      link: placeLink,
    });
  }

  function handlePlaceName(e) {
    setPlaceName(e.target.value);
  }

  function handlePlaceLink(e) {
    setPlaceLink(e.target.value);
  }

  return (
    <PopupWithForm
      name="card-form"
      title="Новый пост"
      buttonText={onLoading ? `Сохранение` : `Создать`}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input
          className="popup__input popup__input_post_name name"
          name="name"
          id="cards-name"
          type="text"
          placeholder="Название"
          maxLength="30"
          minLength="2"
          required
          value={placeName}
          onChange={handlePlaceName}
        />
        <span
          className="popup__error cards-name-error"
          id="cards-name-error"
        ></span>
      </label>
      <label className="popup__label">
        <input
          className="popup__input popup__input_post_activity link"
          type="url"
          id="link"
          name="link"
          placeholder="Ссылка на картинку"
          required
          value={placeLink}
          onChange={handlePlaceLink}
        />
        <span className="popup__error link-error" id="link-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
