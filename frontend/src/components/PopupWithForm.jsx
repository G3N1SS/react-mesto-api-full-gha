export default function PopupWithForm({name, title, titleBtn, children, isOpen, onClose, onSubmit, isButtonLoading, isValid=true}){
  return(
    <div className={`popup popup_type_opened-${name} ${isOpen ? 'popup_opened' : ''}`} onClick={onClose}>
      <div className="popup__box" onClick={(evt => evt.stopPropagation())}>
        <button className="popup__close popup__close_profile" type="button" onClick={onClose}/>
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form" name={name} onSubmit={onSubmit}>
          {children}
          <button 
            className={`popup__save ${isButtonLoading ? 'popup__save_loading' : ''} ${isValid ? '' : 'popup__save_invalid'}`} 
            type="submit"
            disabled={isButtonLoading}
           >
             {isButtonLoading ? '' : titleBtn || 'Сохранить'}
           </button>
        </form>
      </div>
    </div>
    )
}