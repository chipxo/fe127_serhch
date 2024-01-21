import React from "react";

interface ErrorProps {
  error: string | undefined; // or use a more specific type based on your needs
}

export const Error: React.FC<ErrorProps> = ({ error }) => (
  <h2>Error: {typeof error === "string" ? error : "Fetch failed"}</h2>
);
