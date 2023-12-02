export default function PopupImage({ card, isOpen, onClose }) {
  return (
    <div className={`popup popup_type_opened-image ${isOpen ? 'popup_opened' : ''}`} onClick={onClose}>
      <div className="popup__image-box" onClick={(evt) => evt.stopPropagation()}>
        <button className="popup__close popup__close_image" onClick={onClose}></button>
        <img className="popup__image" alt={card.name ? `Mesto: ${card.name}` : '#'} src={card.link ? card.link : '#'} />
        <p className="popup__caption">{card.name}</p>
      </div>
    </div>
  )
}