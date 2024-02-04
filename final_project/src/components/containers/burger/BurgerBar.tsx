import { RootState } from "@/app/rootReducer";
import { useAppDispatch } from "@/app/store";
import {
  setUserData,
  showUserPanel,
} from "@/features/registration/registerSlice";
import Form from "@/features/registration/user/Form";
import UserPannel from "@/features/registration/user/UserPanel";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Burger from "./Burger";

const BurgerBar = () => {
  const dispatch = useAppDispatch();
  const { openUserPanel, openForm } = useSelector(
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
    <>
      <div onClick={() => dispatch(showUserPanel(true))}>
        <Burger />
      </div>
      <AnimatePresence>
        {openUserPanel && <UserPannel isBurger />}
      </AnimatePresence>
      <AnimatePresence>{openForm && <Form />}</AnimatePresence>
    </>
  );
};

export default BurgerBar;
