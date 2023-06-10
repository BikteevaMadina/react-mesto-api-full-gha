import React, { useEffect, useState } from "react";
import { Route, Redirect, useHistory} from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import api from "../utils/Api";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import authApi from "../utils/AuthApi";

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [cards, setCards] = useState([]);

  const [headerEmail, setHeaderEmail] = useState("");
  const [isLuckPopupOpen, setIsLuckPopupOpen] = useState(false);
  const [isInfoTooltipLuck, setIsInfoTooltipLuck] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const history = useHistory();

  useEffect(() => {
    api
      .getUserInfo()
      .then((profileInfo) => setCurrentUser(profileInfo))
      .catch((err) => console.log(err));

    api
      .getInitialCards()
      .then((data) => {
        setCards(
          data.map((card) => ({
            _id: card._id,
            name: card.name,
            link: card.link,
            likes: card.likes,
            owner: card.owner,
          }))
        );
      })
      .catch((err) => console.log(err));
  }, []);

  function closeAllPopup() {
    setEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
    setIsLuckPopupOpen(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((user) => user._id === currentUser._id);

    api
      .addLike(card._id, !isLiked)
      .then((newCard) =>
        setCards((state) =>
          state.map((item) => (item._id === card._id ? newCard : item))
        )
      )
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() =>
        setCards((state) => state.filter((item) => item._id !== card._id))
      )
      .catch((err) => console.log(err));
  }

  function handleUpdateUser(newInfo) {
    setIsLoading(true);
    api
      .setInfo(newInfo)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopup();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar(newAvatar) {
    setIsLoading(true);
    api
      .setAvatar(newAvatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopup();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    api
      .addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopup();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  const isOpen = isEditAvatarPopupOpen
        || isEditProfilePopupOpen
        || isAddPlacePopupOpen
        || isLuckPopupOpen
        || selectedCard;

  useEffect(() => {
    function closeOnEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopup();
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", closeOnEscape);
      return () => document.removeEventListener("keydown", closeOnEscape);
    }
  }, [isOpen]);


  function handelRegisterUser(email, password) {
    authApi
      .registerUser(email, password)
      .then((data) => {
        if (data) {
          setIsInfoTooltipLuck(true);
          history.push("/sign-in");
        }
      })
      .catch((err) => {
        setIsInfoTooltipLuck(false);
        console.log(err);
      })
      .finally(() => setIsLuckPopupOpen(true));
  }

  function handelAuthUser(email, password) {
    authApi
      .loginUser(email, password)
      .then((data) => {
        if (data.token) {
          setHeaderEmail(email);
          setIsLoggedIn(true);
          localStorage.setItem("jwt", data.token);
          history.push("/");
        }
      })
      .catch((err) => {
        setIsInfoTooltipLuck(false);
        setIsLuckPopupOpen(true);
        console.log(err);
      });
  }

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      authApi
        .checkToken(jwt)
        .then((data) => {
          if (data) {
            setIsLoggedIn(true);
            setHeaderEmail(data.data.email);
            history.push("/");
          }
        })
        .catch((err) => console.log(err));
    }
  }, [history]);

  function handelSignOut() {
    localStorage.removeItem("jwt");
    setHeaderEmail("");
    setIsLoggedIn(false);
    history.push("/sign-in");
  }

  
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          signUp="Регистрация"
          signIn="Войти"
          signOut="Выйти"
          onSignOut={handelSignOut}
          headerEmail={headerEmail}
        />

        <ProtectedRoute
          component={Main}
          onEditAvatar={setEditAvatarPopupOpen}
          onEditProfile={setIsEditProfilePopupOpen}
          onAddPlace={setIsAddPlacePopupOpen}
          onCardClick={setSelectedCard}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
          isLoggedIn={isLoggedIn}
          path="/"
        />
        {isLoggedIn && <Footer />}

        <Route path="/sign-up">
          <Register
            title="Регистрация"
            message="Уже зарегистрированы? Войти"
            buttonText="Зарегистрироваться"
            onRegister={handelRegisterUser}
          />
        </Route>

        <Route path="/sign-in">
          <Login title="Вход" buttonText="Войти" onLogin={handelAuthUser} />
        </Route>

        <Route>
          {isLoggedIn 
          ? <Redirect to="/" /> 
          : <Redirect to="/sign-in" />}
        </Route>
        
        <ImagePopup card={selectedCard} onClose={closeAllPopup} />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopup}
          onUpdateUser={handleUpdateUser}
          onLoading={isLoading}
        />

        <PopupWithForm name="consent" title="Вы уверены?" buttonText="Да" />

        <EditAvatarPopup
          onUpdateAvatar={handleUpdateAvatar}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopup}
          onLoading={isLoading}
        />

        <AddPlacePopup
          onAddPlace={handleAddPlaceSubmit}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopup}
          onLoading={isLoading}
        />

       <InfoTooltip
          isLuck={isInfoTooltipLuck}
          isOpen={isLuckPopupOpen}
          onClose={closeAllPopup}
          name={"luck"}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;