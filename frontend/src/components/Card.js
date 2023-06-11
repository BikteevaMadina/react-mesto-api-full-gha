import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card({ card, onCardLike, onCardDelete, onCardClick }) {
  const currentUser = React.useContext(CurrentUserContext);
  
  const isLiked = card.likes.some((userId) => userId === currentUser._id);
  const cardLikeButtonClassName = `${ isLiked ? "elements__like elements__like_active" : "elements__like"
  }`;
  const isOwn = card.owner === currentUser._id;
  const deleteButtonClassName = `${
    isOwn ? "elements__delete elements__delete_active" : "elements__delete "
  }`;

  function handleCardClick() {
    onCardClick(card);
  }

  function handelLikeClick() {
    onCardLike(card);
  }

  function handelDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="elements__element">
      <img
        className="elements__image"
        src={card.link}
        alt={card.name}
        onClick={handleCardClick}
      />
      <div className="elements__discription">
        <h2 className="elements__title">{card.name}</h2>
        <div className="elements__like-discription">
          <button
            className={cardLikeButtonClassName}
            onClick={handelLikeClick}
            type="button"
            title="Нравится"
          ></button>
          <span className="elements__like-quantity" title="Количество лайков">
            {card.likes.length}
          </span>
        </div>
      </div>
      <button
        className={deleteButtonClassName}
        onClick={handelDeleteClick}
        type="button"
        title="Удалить"
      ></button>
    </li>
  );
}

export default Card;
