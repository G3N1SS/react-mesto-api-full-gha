import './Header.jsx'
import Header from './Header.jsx'
import Main from './Main.jsx'
import Footer from './Footer.jsx'
import PopupWithForm from './PopupWithForm.jsx'
import PopupImage from './PopupImage.jsx'
import { useCallback, useEffect, useState } from 'react'
import CurrentUserContext from '../contexts/CurrentUserContext.jsx'
import api from '../utils/api.js'
import EditProfilePopup from './EditProfilePopup.jsx'
import EditAvatarPopup from './EditAvatarPopup.jsx'
import AddPlacePopup from './AddPlacePopup.jsx'
import { Route, Routes, Link, useNavigate, Navigate } from 'react-router-dom';
import Register from './Register.jsx'
import Login from './Login.jsx'
import PageNotFound from './PageNotFound.jsx'
import SendContext from '../contexts/SendContext.jsx'
import InfoTooltip from './InfoToolTip.jsx'
import { authorization, getUserData, registration } from '../utils/auth.js'
import ProtectedRoute from './ProtectedRoute.jsx'


function App() {
  const navigate = useNavigate()
  //states for popups
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopup] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isButtonLoading, setIsButtonLoading] = useState(false)
  const [isResultPopupOpen, setIsResultPopupOpen] = useState(false)
  const isOpen = isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen || isDeletePopupOpen || isImagePopupOpen || isResultPopupOpen
  //context states
  const [currnetUser, setCurrentUser] = useState([])
  const [userEmail, setUserEmail] = useState('')
  //cards states
  const [cards, setCards] = useState([])
  const [isLoading, setIsLoadingCards] = useState(true)
  const [deleteCardId, setDeleteCardId] = useState('')
  //login & registrations states
  const [loggedIn, setLoggedIn] = useState(false)
  const [isSuccessful, setIsSuccessful] = useState(false)
  const [isCheckToken, setIsCheckToken] = useState(true)

  function handleLogin(password, email) {
    setIsButtonLoading(true)
    authorization(password, email)
      .then(res => {
        localStorage.setItem('jwt', res.token)
        setLoggedIn(true)
        navigate('/')
      })
      .catch(err => {
        setIsResultPopupOpen(true)
        setIsSuccessful(false)
        console.error(`Ошибка при авторизации ${err}`)
      })
      .finally(() => setIsButtonLoading(false))
  }

  function handleRegister(password, email) {
    setIsButtonLoading(true)
    registration(password, email)
      .then(() => {
        setIsSuccessful(true)
        navigate('/sign-in')
      })
      .catch(err => {
        setIsSuccessful(false)
        // console.error(`Ошибка при регистрации ${err}`)
      })
      .finally(() => {
        setIsResultPopupOpen(true)
        setIsButtonLoading(false)
      })
  }

  const setAllStatesForClosePopups = () => {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setImagePopup(false)
    setDeletePopupOpen(false)
    setIsResultPopupOpen(false)
  }

  const closePopupByEsc = useCallback((evt) => {
    if (evt.key === 'Escape') {
      setAllStatesForClosePopups()
      document.removeEventListener('keydown', closePopupByEsc)
    }
  }, [setAllStatesForClosePopups])

  const closeAllPopups = useCallback(() => {
    setAllStatesForClosePopups()
    document.removeEventListener('keydown', closePopupByEsc)
  }, [setAllStatesForClosePopups, closePopupByEsc])

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)

  }

  function handleEditPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopup(true)
  }

  function handleDeletePopupClick(cardId) {
    setDeleteCardId(cardId)
    setDeletePopupOpen(true)
  }

  const handleSubmit = useCallback((request, textError) => {
    setIsButtonLoading(true)
    request()
      .then(closeAllPopups)
      .catch(e => console.error(`${textError} ${e}`))
      .finally(() => setIsButtonLoading(false))
  }, [closeAllPopups])

  const handleDeleteSubmit = useCallback((evt) => {
    evt.preventDefault()
    function makeRequest() {
      return (api.deleteCard(deleteCardId, localStorage.jwt)
        .then(() => {
          setCards(cards.filter(card => { return card._id !== deleteCardId }))
        })
      )
    }
    handleSubmit(makeRequest, 'Ошибка при удалении карточки')
  }, [cards, deleteCardId, handleSubmit])

  const handleUpdateUser = useCallback(userEmail => {
    function makeRequest() {
      return (api.setUserInfo(userEmail, localStorage.jwt))
        .then(res => {
          setCurrentUser(res)
        })
    }
    handleSubmit(makeRequest, 'Ошибка при редактировании профиля')
  }, [handleSubmit])

  const handleUpdateAvatar = useCallback((userEmail, resetInputValues) => {
    function makeRequest() {
      return (api.setNewAvatar(userEmail, localStorage.jwt)
        .then(res => {
          setCurrentUser(res)
          resetInputValues()
        }))
    }
    handleSubmit(makeRequest, 'Ошибка при редактировании аватара')
  }, [handleSubmit])

  const handleAddCard = useCallback((dataCard, resetInputValues) => {
    function makeRequest() {
      return (api.addCard(dataCard, localStorage.jwt)
        .then(res => {
          setCards([res, ...cards]);
          resetInputValues()
        }))
    }
    handleSubmit(makeRequest, 'Ошибка при добавлении карточки')
  }, [cards, handleSubmit])

  useEffect(() => {
    if (localStorage.jwt) {
      getUserData(localStorage.jwt)
        .then(res => {
          setUserEmail(res.email)
          setLoggedIn(true)
          setIsCheckToken(false)
        })
        .catch(e => console.error(`Ошибка при авторизации ${e}`))
    } else {
      setLoggedIn(false)
      setIsCheckToken(false)
    }
  }, [loggedIn])

  useEffect(() => {
    if (loggedIn) {
      setIsLoadingCards(true)
      Promise.all([api.getInfo(localStorage.jwt), api.getCards(localStorage.jwt)])
        .then(([userEmail, dataCards]) => {
          setCurrentUser(userEmail)
          setCards(dataCards.reverse())
          setIsLoadingCards(false)
        })
        .catch(e => console.error(`Ошибка при загрузке начальных данных ${e}`))
    }
  }, [loggedIn])

  useEffect(() => {
    function closePopupByEsc(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups()
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', closePopupByEsc)
      return () => {
        document.removeEventListener('keydown', closePopupByEsc)
      }
    }
  }, [isOpen, closeAllPopups])

  return (
    <CurrentUserContext.Provider value={currnetUser}>
      <div className="page">

        <Header
          userEmail={userEmail}
          setLoggedIn={setLoggedIn}
          loggedIn={loggedIn}
        />
        <SendContext.Provider value={isButtonLoading}>
          <Routes>
            <Route path='/'
              element={<ProtectedRoute
                element={Main}
                name={'main'}
                onEditProfile={handleEditProfileClick}
                onEditAvatar={handleEditAvatarClick}
                onAddPlace={handleEditPlaceClick}
                onCardClick={handleCardClick}
                onDelete={handleDeletePopupClick}
                cards={cards}
                isLoadingCards={isLoading}
                isLoadingProfile={isLoading}
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
              />} />
            <Route path='/sign-up' element={
              <Register
                name={'sign-up'}
                handleRegister={handleRegister}
              />}
            />
            <Route path='/sign-in' element={
              loggedIn ? <Navigate to={'/'} /> :
                <Login
                  name={'sign-in'}
                  handleLogin={handleLogin}
                />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </SendContext.Provider>

        {loggedIn ? <Footer /> : ''}

        <SendContext.Provider value={isButtonLoading}>
          <EditProfilePopup
            onUpdateUser={handleUpdateUser}
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            isButtonLoading={isButtonLoading}
          />

          <AddPlacePopup
            onAddPlace={handleAddCard}
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            isButtonLoading={isButtonLoading}
          />

          <EditAvatarPopup
            onUpdateAvatar={handleUpdateAvatar}
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            isButtonLoading={isButtonLoading}
          />

          <PopupWithForm
            name='delete'
            title='Вы уверены?'
            titleBtn='Да'
            isOpen={isDeletePopupOpen}
            onClose={closeAllPopups}
            onSubmit={handleDeleteSubmit}
            isButtonLoading={isButtonLoading}
          />

        </SendContext.Provider>

        <PopupImage card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups} />

        <InfoTooltip
          name='result'
          isSuccessful={isSuccessful}
          isOpen={isResultPopupOpen}
          onClose={closeAllPopups}
        />

      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
