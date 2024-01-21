import React from "react";

type ButtonType = {
  onClick?: () => void;
  text: string | React.ReactNode;
  color: string;
};

const Button = ({ onClick, text, color }: ButtonType) => {
  return (
    <div className="">
      <button
        className={`btn btn-${color} btn-outline hover:btn-${color}-content w-full`}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
