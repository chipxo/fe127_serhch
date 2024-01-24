import React from "react";

export type NavType = {
  to: string;
  text: string;
  isDropDown?: boolean;
  children?: React.ReactNode;
};

export type NavType2 = {
  children: React.ReactNode;
};
