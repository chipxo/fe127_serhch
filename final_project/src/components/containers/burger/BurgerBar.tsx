import React, { useEffect, useState } from "react";
import Burger from "./Burger";
import { AnimatePresence, motion as m } from "framer-motion";
import { closeIcon } from "@/components/common/icons";
import { useAppDispatch } from "@/app/store";
import { RootState } from "@/app/rootReducer";
import { useSelector } from "react-redux";
import {
  setUserData,
  showUserPanel,
} from "@/features/registration/registerSlice";
import UserPannel from "../user/UserPanel";

const BurgerBar = () => {
  const dispatch = useAppDispatch();
  const { signedIn, openUserPanel } = useSelector(
    (state: RootState) => state.register,
  );

  useEffect(() => {
    const userDataString = localStorage.getItem("userData");

    if (userDataString !== null) {
      const userDataFromStorage = JSON.parse(userDataString);
      dispatch(setUserData(userDataFromStorage));
    }
  }, [dispatch]);

  return (
    <div>
      <div onClick={() => dispatch(showUserPanel(true))}>
        <Burger />
      </div>
      <AnimatePresence>
        {openUserPanel && <UserPannel isBurger />}
      </AnimatePresence>
    </div>
  );
};

export default BurgerBar;
