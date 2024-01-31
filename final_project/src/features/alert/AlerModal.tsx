import { RootState } from "@/app/rootReducer";
import { useAppDispatch } from "@/app/store";
import { showAlert } from "@/features/alert/alertSlice";
import { AnimatePresence, motion as m } from "framer-motion";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const AlertModal = () => {
  const dispatch = useAppDispatch();

  const { text, openAlert } = useSelector((state: RootState) => state.alert);

  useEffect(() => {
    setTimeout(() => {
      dispatch(showAlert(false));
    }, 2000);
  }, [openAlert]);

  return (
    <>
      <AnimatePresence>
        {openAlert && (
          <m.div
            initial={{ opacity: 0, y: -66 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -66 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="rounded-lg bg-base-300 px-12 py-2"
          >
            <h2 className="text-xl">{text}</h2>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AlertModal;
