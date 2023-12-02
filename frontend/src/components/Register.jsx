import Input from "./Input";
import StartPage from "./StartPage";
import useFormValidation from "../utils/useFormValidation";

export default function Register({ name, handleRegister }) {
  const { values, errors, isValid, isInputValid, handleChange } = useFormValidation()

  function onRegister(evt) {
    evt.preventDefault()
    handleRegister(values.password, values.email)
  }

  return (
    <StartPage name={name} onSubmit={onRegister} isValid={isValid}>
      <Input
        name={'email'}
        type={'email'}
        placeholder={'Email'}
        minLength={'2'}
        maxLength={'100'}
        value={values.email}
        isInputValid={isInputValid.email}
        error={errors.email}
        onChange={handleChange}
      ></Input>
      <Input
        name={'password'}
        type={'password'}
        placeholder={'Пароль'}
        minLength={'8'}
        maxLength={'100'}
        value={values.password}
        isInputValid={isInputValid.password}
        error={errors.password}
        onChange={handleChange}
      ></Input>
    </StartPage>
  )
}