import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, onLoading }) {
  const avatarRef = React.useRef(null);

  useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  function handleChangeAvatar() {
    return avatarRef.current.value;
  }

  return (
    <PopupWithForm
      name="link"
      title="Обновить аватар"
      buttonText={onLoading ? `Сохранение` : `Сохранить`}
      onSubmit={handleSubmit}
      onClose={onClose}
      isOpen={isOpen}
    >
      <input
        className="popup__input popup__input_post_activity link popup__input_link"
        type="url"
        id="link-avatar"
        name="link"
        placeholder="Ссылка на картинку"
        required
        onChange={handleChangeAvatar}
        ref={avatarRef}
      />
      <span className="popup__error link-error" id="link-avatar-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
