const Button = ({ text, onClick, isActive }) => {
  return (
    <div>
      <button
        onClick={onClick}
        className={`border border-dark-blue from-mid-purple to-light-blue px-6 py-2 font-[Montserrat] uppercase transition duration-200 hover:border-white hover:bg-gradient-to-br hover:text-white md:px-10 md:py-3 ${
          isActive ? "border-white bg-mid-purple text-white" : ""
        }`}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
