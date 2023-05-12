const Button = ({ className, value, onClick }) => {

  return (
    <button className={className} onClick={onClick} onTouchEnd={onClick}>
      {value}
    </button>
  );
};

export default Button;