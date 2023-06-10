//  export const initialCards = [
//   {
//     name: 'Архыз',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
//   },
//   {
//     name: 'Челябинская область',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
//   },
//   {
//     name: 'Иваново',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
//   },
//   {
//     name: 'Камчатка',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
//   },
//   {
//     name: 'Холмогорский район',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
//   },
//   {
//     name: 'Байкал',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
//   }
// ];

// Объявление переменных popup
export const popupProfileEdit = document.querySelector('#popup-profile-edit');
export const popupCardAdd = document.querySelector('#popup-card-add');
export const popupImageSelector = '#popup-image-zoom';

// Переменные открытия и закрытия popup

export const profileBtnEdit = document.querySelector(".profile__button-edit");
export const profileBtnAdd = document.querySelector(".profile__button-add");

//export const popupCloseProfileEdit = popupProfileEdit.querySelector(".popup__button-close");
//export const popupCloseCardAdd = popupCardAdd.querySelector(".popup__button-close");
//export const popupCloseImageZoom = popupImageSelector.querySelector(".popup__button-close");

//Переменные для карточек
export const cardBtnSubmit = popupCardAdd.querySelector('#popup__submit-add');
export const elementsListContainer = document.querySelector(".elements__list");
export const elementsTemplate = document.querySelector('#elements-template')

export const formCardName = document.querySelector(".name");
export const formCardLink = document.querySelector(".link");


//Переменные для содержимого popup profile


export const popupDeleteCard = document.querySelector('.popup_delete-card');
export const popupEditAvatarSelector = '#popup-avatar-edit'
export const popupEditAvatar = document.querySelector(popupEditAvatarSelector)
export const avatarEditForm = popupEditAvatar.querySelector('#form-avatar-edit');
export const popupLinkAvatar = popupEditAvatar.querySelector('.popup__input_link')
export const avatarEditButton = document.querySelector('.profile__button-edit-avatar')
// Находим форму в DOM

// Находим поля формы в DOM
export const inputPostName = document.querySelector(".popup__input_post_name");
export const inputPostActivity = document.querySelector(".popup__input_post_activity");

export const popupImage = document.querySelector(".popup__image");
export const popupImageCaption = document.querySelector(".popup__image-caption");

export const cardAddForm = popupCardAdd.querySelector('.popup__form');
export const profileEditForm = popupProfileEdit.querySelector('.popup__form');




export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: "popup__submit_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};


