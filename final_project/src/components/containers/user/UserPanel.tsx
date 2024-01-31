import { AnimatePresence, motion as m } from "framer-motion";
import { closeIcon, goToRightIcon } from "@/components/common/icons";
import {
  setSignedIn,
  setUserData,
  showUserPanel,
} from "@/features/registration/registerSlice";
import { useAppDispatch } from "@/app/store";
import { useSelector } from "react-redux";
import { RootState } from "@/app/rootReducer";
import React, { useEffect, useState } from "react";
import Button from "@/components/common/buttons/Button";
import { Link } from "react-router-dom";
import Form from "./Form";
import BtnRegisSign from "./buttons/BtnRegisSign";
import PanelTitle from "./PanelTitle";
import { mSetting } from "@/utils/motionSettings";
import ThemeSwapper from "@/features/theme/ThemeSwapper";
import ShoppingCartItem from "../nav/CartList";

type UserPanelProps = {
  isBurger?: boolean;
};

const UserPannel: React.FC<UserPanelProps> = ({ isBurger = false }) => {
  const dispatch = useAppDispatch();
  const { userData, openForm, signedIn } = useSelector(
    (state: RootState) => state.register,
  );

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const userDataString = localStorage.getItem("userData");

    if (userDataString !== null) {
      const userDataFromStorage = JSON.parse(userDataString);
      dispatch(setUserData(userDataFromStorage));
    }
  }, [dispatch]);

  const handleSignOut = () => {
    localStorage.removeItem("signedIn");
    document.body?.removeAttribute("class");
    dispatch(showUserPanel(false));
    dispatch(setSignedIn(false));
  };

  const handleDeleteAcc = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem(`user-${userData?.email}`);
    localStorage.removeItem("signedIn");
    dispatch(showUserPanel(false));
    dispatch(setSignedIn(false));
  };

  const handleClosePanel = () => {
    document.body?.removeAttribute("class");
    dispatch(showUserPanel(false));
  };

  return (
    <m.div
      {...mSetting}
      className="fixed inset-0 right-0 top-0 z-[99] grid bg-black/40"
    >
      <m.div
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 300 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="relative justify-self-end border-l border-neutral bg-base-300 p-4 max-sm:w-[56vw] md:w-[40vw] md:p-6 lg:w-[34vw]"
      >
        <nav className="top-4 max-sm:mb-4 max-sm:border-b max-sm:border-neutral max-sm:pb-4 sm:absolute md:left-8 md:top-6">
          <ul className="grid cursor-pointer place-items-center gap-x-4 text-xl max-sm:grid-cols-3 sm:max-md:grid-cols-2">
            <li onClick={handleClosePanel} className="scale-125">
              {closeIcon}
            </li>
            <li className="md:hidden">
              <ThemeSwapper />
            </li>
            <li className="scale-105 sm:hidden">
              <ShoppingCartItem isBurger />
            </li>
          </ul>
        </nav>
        {signedIn && (
          <div className="grid w-full gap-y-4 text-end">
            <PanelTitle />
            <Link
              onClick={() => dispatch(showUserPanel(false))}
              to="/favouriteItems"
              className="text-sm"
            >
              Favourite {goToRightIcon}
            </Link>
            <div className="grid w-full gap-x-3 border-t border-neutral pt-6 max-sm:gap-y-3 sm:grid-cols-2 md:gap-x-6 lg:gap-x-12">
              <Button text="Sign out" onClick={handleSignOut} custom={false} />
              <Button
                text="Delete account"
                onClick={() => setOpen(!open)}
                custom={false}
              />
              <AnimatePresence>
                {open && (
                  <m.div
                    {...mSetting}
                    className="col-span-2 mt-5 text-center text-lg"
                  >
                    <h2>Are you sure?</h2>
                    <div className="mt-4 grid grid-cols-2 gap-x-16">
                      <Button
                        color="error"
                        text="Yes"
                        onClick={handleDeleteAcc}
                      />
                      <Button
                        color="success"
                        text="No"
                        onClick={() => setOpen(!open)}
                      />
                    </div>
                  </m.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
        {isBurger && (
          <>
            {!signedIn && (
              <div className="space-y-4">
                <h2 className="max-sm:text-md ml-6 text-end sm:ml-10">
                  Sign in or register to acces private cabinet
                </h2>
                <div className="grid gap-x-6 gap-y-1 border-t border-neutral pt-4 sm:grid-cols-[1fr_0.1fr_1fr]">
                  <BtnRegisSign text="Sign in" signIn />
                  <h2 className="place-self-center max-sm:text-sm">or</h2>
                  <BtnRegisSign text="Register" />
                </div>
              </div>
            )}
            <AnimatePresence>
              {openForm && (
                <div>
                  <Form />
                </div>
              )}
            </AnimatePresence>
          </>
        )}
      </m.div>
    </m.div>
  );
};

export default UserPannel;
