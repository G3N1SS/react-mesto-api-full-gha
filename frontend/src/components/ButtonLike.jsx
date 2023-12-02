import { useEffect, useState } from "react"
import api from "../utils/api"

export default function ButtonLike({ likes, cardId, ownerId }) {
  const [isLike, setIsLike] = useState(false)
  const [count, setCount] = useState(likes.length)

  useEffect(() => {
    setIsLike(likes.some(item => item.owner_id === item._id))
  }, [likes, ownerId])

  function handleLike() {
    if (isLike) {
      api.removeLike(cardId, localStorage.jwt)
        .then(res => {
          setIsLike(false)
          setCount(res.likes.length)
        })
        .catch((err) => console.error(`Ошибка при снятии лайка ${err}`))
    } else {
      api.putLike(cardId, localStorage.jwt)
        .then(res => {
          setIsLike(true)
          setCount(res.likes.length)
        })
        .catch((err) => console.error(`Ошибка при установке лайка ${err}`))
    }
  }

  return (
    <>
      <div className="elements__like">
        <button className={`elements__like-button ${isLike ? 'elements__like-button_active' : ''}`} type="button" onClick={handleLike}></button>
        <p className="elements__like-count">{count}</p>
      </div>
    </>
  )
}