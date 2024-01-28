import React from "react";

type PathProps = {
  children: string | React.ReactNode;
};

const Path: React.FC<PathProps> = ({ children }) => {
  return (
    <div className="container relative">
      <h2 className="absolute -top-24 left-28 text-lg">{children}</h2>
    </div>
  );
};

export default Path;
