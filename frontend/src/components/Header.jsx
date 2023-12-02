import { useCallback, useState } from 'react'
import Vector from '../images/Vector.svg'
import { Link, Route, Routes } from 'react-router-dom'

export default function Header({ userEmail, setLoggedIn, loggedIn }) {
  const [isBurgerMenuOpened, setIsBurgerMenuOpened] = useState(false)

  const toggleBurgerMenu = useCallback(() => {
    isBurgerMenuOpened ? setIsBurgerMenuOpened(false) : setIsBurgerMenuOpened(true);
    document.querySelector('.header__burger-menu-button').classList.toggle('header__burger-menu-button_type_active')
  }, [isBurgerMenuOpened])

  function onSignOut() {
    localStorage.removeItem('jwt')
    setLoggedIn(false)
  }

  return (
    <>
      {loggedIn ? <>
        {isBurgerMenuOpened ?
          <div className='header__container header__container_type_mobile'>
            <p className='header__email'>{userEmail}</p>
            <Link to="/sign-in" className="header__exit" onClick={onSignOut}>
              Выйти
            </Link>
          </div> : ''}
      </>
        : ''
      }
      <header className="header">
        <img className="header__logo" alt="Место" src={Vector} />
        <Routes>
          <Route path='/sign-in' element={<Link to={`/sign-up`} className='header__button-register'>Регистрация</Link>} />
          <Route path='/sign-up' element={<Link to={`/sign-in`} className='header__button-register'>Войти</Link>} />
          <Route path='/' element={
            <>
              <button className='header__burger-menu-button' onClick={toggleBurgerMenu} />
              <div className='header__container header__container_type_desktop'>
                <p className='header__email'>{userEmail}</p>
                <Link to="/sign-in" className="header__exit" onClick={onSignOut}>
                  Выйти
                </Link>
              </div>
            </>} />
        </Routes>
      </header>
    </>
  )
}

