import { Link } from "react-router-dom";
import Form from "./Form";

export default function StartPage({ name, children, isValid, onSubmit }) {
  return (
    <section className="login">
      <h2 className="login__title">{name === 'sign-up' ? 'Регистрация' : 'Вход'}</h2>
      <Form
        name={name}
        titleButton={name === 'sign-up' ? 'Регистрация' : 'Войти'}
        children={children}
        isValid={isValid}
        onSubmit={onSubmit}
      />
      {name === 'sign-up' ? <Link className="login__caption" to="/sign-in">Уже зарегистрированы? Войти</Link> : ''}
    </section>
  )
}