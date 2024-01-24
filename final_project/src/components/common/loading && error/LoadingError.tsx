import React from "react";

type ErrorProps = {
  error: string | {};
};

export const Loading: React.FC = () => (
  <div className="grid h-screen place-items-center">
    <span className="loading loading-dots loading-lg scale-125 text-info" />
  </div>
);

export const Error: React.FC<ErrorProps> = ({ error }) => (
  <div className="grid h-screen place-items-center">
    

  <h2>Error: {typeof error === "string" ? error : "Fetch failed"}</h2>
  </div>
);
