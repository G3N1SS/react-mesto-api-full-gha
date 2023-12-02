import { useContext, useEffect } from "react";
import useFormValidation from "../utils/useFormValidation";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";


export default function EditProfilePopup({ isOpen, onClose, onUpdateUser, isButtonLoading }) {
  const currentUser = useContext(CurrentUserContext)
  const { values, errors, isValid, isInputValid, handleChange, resetInputValues, setInputValue } = useFormValidation()

  useEffect(() => {
    setInputValue("name", currentUser.name)
    setInputValue("job", currentUser.about)
  }, [currentUser, setInputValue])

  function resetClose() {
    onClose()
    resetInputValues({ name: currentUser.name, job: currentUser.about })
  }

  function handleSubmit(evt) {
    evt.preventDefault()
    onUpdateUser({ name: values.name, job: values.job }, resetInputValues)
  }

  return (
    <PopupWithForm
      name='profile'
      title='Редактировать профиль'
      isOpen={isOpen}
      onClose={resetClose}
      isValid={isValid}
      isButtonLoading={isButtonLoading}
      onSubmit={handleSubmit}
    >
      <input
        className={`popup__input popup__input_type_name ${isInputValid.name === undefined || isInputValid.name ? ' ' : 'popup__input_state_invalid'}`}
        type="text" name="name"
        required
        minLength={2}
        maxLength={40}
        placeholder='Введите Имя'
        value={values.name ? values.name : ''}
        disabled={isButtonLoading}
        onChange={handleChange}
      />
      <span id="name-error" className="error">{errors.name}</span>
      <input
        className={`popup__input popup__input_type_job ${isInputValid.job === undefined || isInputValid.job ? ' ' : 'popup__input_state_invalid'}`}
        type="text"
        name="job"
        required
        minLength={2}
        maxLength={200}
        placeholder='О себе'
        value={values.job ? values.job : ''}
        disabled={isButtonLoading}
        onChange={handleChange}
      />
      <span id="job-error" className="error">{errors.job}</span>
    </PopupWithForm>
  )
}