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
import { useEffect, useState } from "react";
import Button from "@/components/common/buttons/Button";
import { Link } from "react-router-dom";

const UserPannel = () => {
  const dispatch = useAppDispatch();
  const { userData } = useSelector((state: RootState) => state.register);

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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 right-0 top-0 z-[99] grid bg-black/50"
    >
      <m.div
        initial={{ x: 200 }}
        animate={{ x: 0 }}
        exit={{ x: 200 }}
        transition={{ ease: "easeOut", duration: 0.3 }}
        className="w-[30vw] justify-self-end border-l border-neutral bg-base-300 p-4"
      >
        <div className="flex justify-between">
          <div className="w-fit space-y-8">
            <h2 className="mb-4 text-xl">Hi, {userData?.name}</h2>
            <Link
              onClick={() => dispatch(showUserPanel(false))}
              to="/favouriteItems"
            >
              Favourite Items {goToRightIcon}
            </Link>
            <div className="grid grid-cols-2 gap-x-12">
              <Button text="Sign out" color="primary" onClick={handleSignOut} />
              <Button
                text="Delete account"
                color="error"
                onClick={() => setOpen(!open)}
              />
              <AnimatePresence>
                {open && (
                  <m.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="col-span-2 mt-5 text-center text-lg"
                  >
                    <h2>Are you sure?</h2>
                    <div className="mt-4 grid grid-cols-2 gap-x-16">
                      <button
                        className="rounded-md border border-neutral transition-colors hover:border-white"
                        onClick={handleDeleteAcc}
                      >
                        Yes
                      </button>
                      <button
                        className="rounded-md border border-neutral transition-colors hover:border-white"
                        onClick={() => setOpen(!open)}
                      >
                        No
                      </button>
                    </div>
                  </m.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <div
            onClick={handleClosePanel}
            className="relative -top-1 w-fit cursor-pointer text-2xl"
          >
            {closeIcon}
          </div>
        </div>
      </m.div>
    </m.div>
  );
};

export default UserPannel;
