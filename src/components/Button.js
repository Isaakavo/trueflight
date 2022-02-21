


const Button = ({label, handler, disabled, extraClass = ''}) => {
return (
  <button 
    className={`search-button ${extraClass}`}
    onClick={handler}
    disabled={disabled}
    >
    {label}
  </button>
)
}

export default Button;