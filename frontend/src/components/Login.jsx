import Input from "./Input";
import StartPage from "./StartPage";
import useFormValidation from "../utils/useFormValidation";

export default function Login({ name, handleLogin }) {
  const { values, errors, isValid, isInputValid, handleChange } = useFormValidation()

  function onLogin(evt) {
    evt.preventDefault()
    handleLogin(values.password, values.email)
  }

  return (
    <div className="login">
      <StartPage
        name={name}
        onSubmit={onLogin}
        isValid={isValid}
      >
        <Input
          name={'email'}
          type={'email'}
          placeholder={'Email'}
          minLength={'2'}
          maxLength={'100'}
          value={values.email}
          onChange={handleChange}
          isInputValid={isInputValid.email}
          error={errors.email}
        ></Input>
        <Input
          name={'password'}
          type={'password'}
          placeholder={'Пароль'}
          minLength={'8'}
          maxLength={'100'}
          value={values.password}
          onChange={handleChange}
          isInputValid={isInputValid.password}
          error={errors.password}
        ></Input>
      </StartPage>
    </div>
  )
}