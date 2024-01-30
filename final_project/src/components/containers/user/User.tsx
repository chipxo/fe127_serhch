import { cartUser, closeIcon } from "../../common/icons";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Form from "./Form";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/rootReducer";
import { useAppDispatch } from "../../../app/store";
import {
  showForm,
  showUserPanel,
} from "../../../features/registration/registerSlice";
import UserPannel from "./UserPanel";
import { useEffect } from "react";

const User = () => {
  const dispatch = useAppDispatch();
  const {
    alreadyRegistered,
    signedIn,
    showForm: open,
    showUserPanel: pannel,
  } = useSelector((state: RootState) => state.register);

  const handleUserClick = () => {
    document.body?.setAttribute("class", "overflow-hidden pr-[14px]");

    if (signedIn) {
      dispatch(showUserPanel(true));
    } else {
      dispatch(showForm(true));
    }
  };

  const handleCloseForm = () => {
    document.body?.removeAttribute("class");
    dispatch(showForm(false));
  };

  return (
    <>
      <div onClick={handleUserClick} className="cursor-pointer">
        {cartUser}
      </div>
      <AnimatePresence>
        {pannel && signedIn ? (
          <UserPannel />
        ) : (
          open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] grid items-center bg-black/75 px-[14vw]"
            >
              <div className="rounded-md bg-base-300">
                <h2 className="relative border-b border-neutral py-3 pl-4 text-2xl font-bold">
                  {alreadyRegistered ? "Sign in" : "Register"}
                  <span
                    onClick={handleCloseForm}
                    className="absolute right-4 top-2.5 cursor-pointer"
                  >
                    {closeIcon}
                  </span>
                </h2>
                <div className="grid grid-cols-[1fr_0.8fr]">
                  <Form />
                  <div className="relative grid place-items-center border-l border-neutral">
                    <span className="absolute -left-2 top-1/2 -translate-y-1/2 bg-base-300 py-3">
                      or
                    </span>
                    <div className="grid gap-4">
                      <h2 className="text-2xl">Sign in with</h2>
                      <Link
                        to=""
                        className="rounded-md border border-neutral px-4 py-1 text-center text-info"
                      >
                        {/* {googleIcon} */}
                        Google
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        )}
      </AnimatePresence>
    </>
  );
};

export default User;
