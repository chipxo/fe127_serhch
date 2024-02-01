import { cartUser } from "@/components/common/icons";
import { AnimatePresence } from "framer-motion";
import Form from "./Form";
import { useSelector } from "react-redux";
import { RootState } from "@/app/rootReducer";
import { useAppDispatch } from "@/app/store";
import { showForm, showUserPanel } from "@/features/registration/registerSlice";
import UserPannel from "./UserPanel";
import AlertModal from "@/features/alert/AlerModal";
import { Button } from "@/components/ui/button";

const User = () => {
  const dispatch = useAppDispatch();
  const { signedIn, openForm, openUserPanel } = useSelector(
    (state: RootState) => state.register,
  );

  const handleUserClick = () => {
    document.body?.setAttribute("class", "overflow-hidden mr-[15px]");

    if (signedIn) {
      dispatch(showUserPanel(true));
    } else {
      dispatch(showForm(true));
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        onClick={handleUserClick}
        className="relative z-[50] cursor-pointer"
      >
        {cartUser}
      </Button>
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
