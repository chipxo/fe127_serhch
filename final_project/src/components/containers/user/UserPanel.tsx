import { motion } from "framer-motion";
import { closeIcon, goToRightIcon } from "../../common/icons";
import {
  setSignedIn,
  setUserData,
  showUserPanel,
} from "../../../features/registration/registerSlice";
import { useAppDispatch } from "../../../app/store";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/rootReducer";
import { useEffect } from "react";
import Button from "../../common/buttons/Button";
import { Link } from "react-router-dom";

const UserPannel = () => {
  const dispatch = useAppDispatch();
  const { userData } = useSelector((state: RootState) => state.register);

  useEffect(() => {
    const userDataString = localStorage.getItem("userData");

    if (userDataString !== null) {
      const userDataFromStorage = JSON.parse(userDataString);
      dispatch(setUserData(userDataFromStorage));
    }
  }, [dispatch]);

  const handleSignOut = () => {
    localStorage.removeItem("signedIn");
    dispatch(setSignedIn(false));
  };

  const handleDeleteAcc = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem(`user-${userData?.email}`);
    localStorage.removeItem("signedIn");
    dispatch(setSignedIn(false));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 right-0 top-0 z-[99] grid bg-black/50"
    >
      <motion.div
        initial={{ x: 200 }}
        animate={{ x: 0 }}
        exit={{ x: 200 }}
        transition={{ ease: "easeOut", duration: 0.3 }}
        className="w-[30vw] justify-self-end border-l border-neutral bg-base-300 p-4"
      >
        <div className="flex justify-between">
          <div className="w-fit space-y-8">
            <h2 className="mb-4 text-xl">Hi, {userData?.name}</h2>
            <Link to="/favouriteItems">Favourite Items {goToRightIcon}</Link>
            <div className="grid grid-cols-2 gap-x-12">
              <Button text="Sign out" color="primary" onClick={handleSignOut} />
              <Button
                text="Delete account"
                color="error"
                onClick={handleDeleteAcc}
              />
            </div>
          </div>
          <div
            onClick={() => dispatch(showUserPanel(false))}
            className="relative -top-1 w-fit cursor-pointer text-2xl"
          >
            {closeIcon}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default UserPannel;
