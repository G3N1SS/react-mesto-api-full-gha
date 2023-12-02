import { useContext } from "react"
import CurrentUserContext from "../contexts/CurrentUserContext.jsx"
import ButtonLike from "./ButtonLike.jsx"

export default function Card({ card, onCardClick, onDelete }) {
  const currentUser = useContext(CurrentUserContext)

  return (
    <div className="elements__card">
      {currentUser._id === card.owner._id && <button className="elements__delete-button" onClick={() => onDelete(card._id)}></button>}
      <img className="elements__image" alt={`Место: ${card.name}`} src={card.link} onClick={() => { onCardClick({ link: card.link, name: card.name }) }} />
      <div className="elements__banner">
        <h2 className="elements__name">{card.name}</h2>
        <ButtonLike likes={card.likes} cardId={card._id} ownerId={card.owner._id}></ButtonLike>
      </div>
    </div>
  )
}