import React from "react";

type ButtonType = {
  onClick?: () => void;
  text: string | React.ReactNode;
  color: string;
  disabled?: boolean;
};

const Button = ({ onClick, text, color, disabled }: ButtonType) => {
  return (
    <div className="">
      <button
        className={`btn btn-${color} btn-outline hover:btn-${color}-content w-full`}
        onClick={onClick}
        disabled={disabled}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
