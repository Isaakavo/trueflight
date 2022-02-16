const Input = ({
  id,
  className,
  type,
  placeholder,
  value,
  onChange,
  onClick,
}) => {
  return (
    <input
      id={id}
      className={className}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onClick={onClick}
      autoComplete='off'
    />
  );
};

export default Input;
