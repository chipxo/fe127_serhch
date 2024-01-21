import { Outlet } from "react-router-dom";
import NavBar from "../containers/nav/NavBar";

const Layout = () => {
  return (
    <>
      <header className="sticky top-0 z-[999] transition-all duration-150">
        <NavBar />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
