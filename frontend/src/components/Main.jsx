import { useContext } from "react"
import Card from "./Card.jsx"
import CurrentUserContext from "../contexts/CurrentUserContext.jsx"
import Spinner from "./Spinner/Spinner.jsx"

export default function Main({ name, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onDelete, cards, isLoadingCards, isLoadingProfile }) {
  const currentUser = useContext(CurrentUserContext)

  return (
    <main>
      <section className="profile">
        {isLoadingProfile ? ' ' : <div className="profile__info">
          <img className="profile__avatar-image" alt="Аватар" src={currentUser.avatar ? currentUser.avatar : '#'} />
          <button className="profile__avatar-button" onClick={onEditAvatar}></button>
          <div className="profile__banner">
            <h1 className="profile__name">{currentUser.name ? currentUser.name : ' '}</h1>
            <p className="profile__job">{currentUser.about ? currentUser.about : ' '}</p>
            <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
          </div>
          <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
        </div>}
      </section>
      <section className="elements">
        {isLoadingCards ? <Spinner /> :
          <div className="element">
            {cards.map(data => {
              return (
                <Card card={data} onCardClick={onCardClick} key={data._id} onDelete={onDelete} />
              )
            })}
          </div>
        }
      </section>
    </main>
  )
}
