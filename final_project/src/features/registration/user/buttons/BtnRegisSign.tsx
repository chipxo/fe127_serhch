import { useAppDispatch } from "@/app/store.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  setRegistered,
  showForm,
  showUserPanel,
} from "@/features/registration/registerSlice.tsx";
import React from "react";

type BtnProps = {
  signIn?: boolean;
  text: string;
};

const BtnRegisSign: React.FC<BtnProps> = ({ signIn = false, text }) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(showUserPanel(false));
    dispatch(showForm(true));

    setTimeout(() => {
      dispatch(setRegistered(signIn));
    }, 3000);
  };

  return (
    <Button onClick={handleClick} variant="outline">
      {text}
    </Button>
  );
};

export default BtnRegisSign;
