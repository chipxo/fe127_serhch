import { RootState } from "@/app/rootReducer";
import { useSelector } from "react-redux";

const PanelTitle = () => {
  const { userData } = useSelector((state: RootState) => state.register);
  return <h2 className="text-lg md:text-xl">Hi, {userData?.name}</h2>;
};

export default PanelTitle;
