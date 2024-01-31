import { useAppDispatch } from "@/app/store";
import Button from "@/components/common/buttons/Button";
import {
  setRegistered,
  showForm,
  showUserPanel,
} from "@/features/registration/registerSlice";
import React from "react";

type BtnProps = {
  signIn?: boolean;
  text: string;
};

const BtnRegisSign: React.FC<BtnProps> = ({ signIn = false, text }) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(setRegistered(signIn));
    dispatch(showUserPanel(false));
    dispatch(showForm(true));
  };

  return <Button text={text} onClick={handleClick} custom={false} />;
};

export default BtnRegisSign;
