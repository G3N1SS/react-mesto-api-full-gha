export default function Popup({ name, isOpen, onClose, children }) {
  return (
    <div className={`popup popup_type_opened-${name}  ${isOpen ? 'popup_opened' : ''}`} onClick={onClose}>
      <div
        className={`${name === 'image' ? 'popup__image-box' : 'popup__box'} ${name === 'result' ? 'popup__registration-container' : ''}`}
        onMouseDown={(evt) => evt.stopPropagation()}
      >
        <button type='button' className='popup__close' onClick={onClose} />
        {children}
      </div>
    </div>
  )
} 