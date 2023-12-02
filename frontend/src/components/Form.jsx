export default function Form({ name, titleButton, children, isValid, onSubmit }) {
  return(
    <form onSubmit={onSubmit}>
      {children}
      {name === 'sign-in' || name === 'sign-up' ? 
      <button className='login__submit'>
        {titleButton}
      </button>
       : 
      <button className='popup__save'>
        {titleButton}
      </button>
      }
    </form>
  )
}