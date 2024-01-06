const Button = ({ text, onClick, isActive }) => {
  return (
    <div>
      <button
        onClick={onClick}
        className={`to-light-blue from-mid-purple border px-6 py-2 font-[Montserrat] uppercase transition-all hover:bg-gradient-to-br hover:text-white md:px-10 md:py-3
        ${isActive ? "bg-dark-blue text-white" : ""}`}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
