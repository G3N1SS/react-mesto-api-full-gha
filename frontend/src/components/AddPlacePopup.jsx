import useFormValidation from "../utils/useFormValidation";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace, isButtonLoading }) {
  const { values, errors, isValid, isInputValid, handleChange, resetInputValues } = useFormValidation()

  function resetClose() {
    onClose()
    resetInputValues()
  }

  function handleSubmit(evt) {
    evt.preventDefault()
    onAddPlace({ inputPlace: values.inputPlace, inputImage: values.inputImage }, resetInputValues)
  }

  return (
    <PopupWithForm
      name='add'
      title='Добавить mesto'
      titleBtn='Создать'
      isOpen={isOpen}
      onClose={resetClose}
      isButtonLoading={isButtonLoading}
      isValid={isValid}
      onSubmit={handleSubmit}
    >
      <input
        className={`popup__input popup__input_type_place  ${isInputValid.inputPlace === undefined || isInputValid.inputPlace ? '' : "popup__input_state_invalid"}`}
        type="text" name="inputPlace"
        placeholder="Название"
        required
        minLength={2}
        value={values.inputPlace ? values.inputPlace : ''}
        disabled={isButtonLoading}
        onChange={handleChange}
      />
      <span id="inputPlace-error" className="error">{errors.inputPlace}</span>
      <input
        className={`popup__input popup__input_type_image  ${isInputValid.inputImage === undefined || isInputValid.inputImage ? '' : "popup__input_state_invalid"}`}
        name="inputImage"
        placeholder="Ссылка на картинку"
        required
        minLength={2}
        type="url"
        value={values.inputImage ? values.inputImage : ''}
        disabled={isButtonLoading}
        onChange={handleChange}
      />
      <span id="inputImage-error" className="error">{errors.inputImage}</span>
    </PopupWithForm>
  )
}