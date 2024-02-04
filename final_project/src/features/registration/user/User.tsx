import { RootState } from "@/app/rootReducer.tsx";
import { useAppDispatch } from "@/app/store.tsx";
import { cartUser } from "@/components/common/icons.tsx";
import { Avatar, AvatarFallback } from "@/components/ui/avatar.tsx";
import { Button } from "@/components/ui/button.tsx";
import AlertModal from "@/features/alert/AlerModal.tsx";
import {
  showForm,
  showUserPanel,
} from "@/features/registration/registerSlice.tsx";
import { mOpacity } from "@/utils/motionSettings.tsx";
import { AnimatePresence, motion as m } from "framer-motion";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Form from "./Form.tsx";
import UserPannel from "./UserPanel.tsx";

const User = () => {
  const dispatch = useAppDispatch();
  const { signedIn, openForm, userData, openUserPanel } = useSelector(
    (state: RootState) => state.register,
  );

  const handleUserClick = () => {
    document.body?.setAttribute("class", "overflow-hidden md:mr-[15px]");

    if (signedIn) {
      dispatch(showUserPanel(true));
    } else {
      dispatch(showForm(true));
    }
  };

  const [name, setName] = useState("");

  useEffect(() => {
    setName(userData?.name.slice(0, 1).toUpperCase() as string);
  }, [userData]);

  return (
    <>
      <AnimatePresence>
        {signedIn ? (
          <m.div {...mOpacity}>
            <Avatar onClick={handleUserClick} className="cursor-pointer">
              <AvatarFallback className="border-2 border-primary/60 bg-background">
                {name}
              </AvatarFallback>
            </Avatar>
          </m.div>
        ) : (
          <m.div {...mOpacity}>
            <Button
              variant="ghost"
              onClick={handleUserClick}
              className="relative z-[50] cursor-pointer"
            >
              {cartUser}
            </Button>
          </m.div>
        )}
      </AnimatePresence>

      <div className="fixed left-1/2 top-20 z-[999] -translate-x-1/2">
        <AlertModal />
      </div>
      <AnimatePresence>
        {openUserPanel && signedIn ? <UserPannel /> : openForm && <Form />}
      </AnimatePresence>
    </>
  );
};

export default User;
