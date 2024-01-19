type ButtonType = {
  onClick?: () => void;
  text: string;
  color: string;
};

const Button = ({ onClick, text, color }: ButtonType) => {
  return (
    <div className="">
      <button
        className={`btn btn-${color} btn-outline hover:btn-${color}-content`}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
