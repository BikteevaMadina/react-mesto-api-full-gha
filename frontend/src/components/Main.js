import React from "react";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <button
          className="profile__button-edit-avatar"
          type="button"
          title="Редактировать аватар"
          onClick={() => {
            onEditAvatar(true);
          }}
        >
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="Фотография профиля"
          />
        </button>
        <div className="profile__info">
          <div className="profile__name">
            <h1 className="profile__user">{currentUser.name}</h1>
            <button
              className="profile__button-edit"
              type="button"
              title="Редактирование"
              onClick={() => {
                onEditProfile(true);
              }}
            ></button>
          </div>
          <p className="profile__discription">{currentUser.about}</p>
        </div>
        <button
          className="profile__button-add"
          type="button"
          title="Новый пост"
          onClick={() => {
            onAddPlace(true);
          }}
        ></button>
      </section>
      <section className="elements">
        <ul className="elements__list">
          {cards.map((card) => (
            <Card
              card={card}
              key={card._id}
              onCardDelete={onCardDelete}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
