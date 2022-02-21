const Input = ({
  id,
  className,
  type,
  name,
  placeholder,
  value,
  onChange,
  onClick,
  max,
  min,
  disabled
}) => {
  return (
    <input
      id={id}
      name={name}
      className={className}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onClick={onClick}
      max={type === 'date' ? max : ''}
      min={type === 'date' ? min : ''}
      disabled={disabled}
      autoComplete='off'
    />
  );
};

export default Input;
