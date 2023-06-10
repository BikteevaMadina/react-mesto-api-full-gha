import React from "react";

function InfoTooltip({ name, onClose, isOpen, isLuck }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          className="popup__button-close"
          onClick={onClose}
          type="button"
        />
        <div
          className={`popup__luck ${isLuck 
            ? "popup__luck_type_okey" 
            : "popup__luck_type_fail"
          }`}
        />
        <h2 className="popup__title">
          {isLuck
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте еще раз."}
        </h2>
      </div>
    </div>
  );
}
export default InfoTooltip;
