import React from "react";

type ButtonProps = {
  onClick?: () => void;
  text: string | React.ReactNode;
  color?: string;
  disabled?: boolean;
  custom?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  onClick,
  text,
  color,
  disabled,
  custom = true,
}) => {
  return (
    <button
      className={`btn btn-${color} ${custom && `btn-outline hover:btn-${color}-content`}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
