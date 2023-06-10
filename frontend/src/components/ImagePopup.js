import React from "react";

function ImagePopup({ card, onClose }) {
  return (
    <div
      className={`popup popup_image_bg popup_image-zoom ${
        card.link ? "popup_opened" : ""
      }`}
    >
      <div className="popup__image-block">
        <button
          className="popup__button-close"
          type="button"
          onClick={onClose}
        ></button>
        <figure className="popup__figure">
          <img className="popup__image" src={card.link} alt={card.name} />
          <figcaption className="popup__image-caption">{card.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
