import { useRef } from "react";
import useFormValidation from "../utils/useFormValidation";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isButtonLoading }) {
  const { values, errors, isValid, isInputValid, handleChange, resetInputValues } = useFormValidation()
  const input = useRef()

  function resetClose() {
    onClose()
    resetInputValues()
  }

  function handleSubmit(evt) {
    evt.preventDefault()
    onUpdateAvatar({
      inputAvatar: input.current.value
    }, resetInputValues)
  }

  return (
    <PopupWithForm
      name='avatar'
      title='Обновить аватар'
      isOpen={isOpen}
      onClose={resetClose}
      onSubmit={handleSubmit}
      isButtonLoading={isButtonLoading}
      isValid={isValid}
    >
      <input
        className={`popup__input popup__input_type_avatar ${isInputValid.inputAvatar === undefined || isInputValid.inputAvatar ? '' : "popup__input_state_invalid"}`}
        type="url"
        name="inputAvatar"
        placeholder="Ссылка на аватар"
        required
        minLength="2"
        value={values.inputAvatar ? values.inputAvatar : ''}
        disabled={isButtonLoading}
        onChange={handleChange}
        ref={input}
      />
      <span id="inputAvatar-error" className="error">{errors.inputAvatar}</span>
    </PopupWithForm>
  )
}