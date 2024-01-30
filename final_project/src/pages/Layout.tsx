import { Outlet } from "react-router-dom";
import NavBar from "../components/containers/nav/NavBar.tsx";
import { useEffect } from "react";
import Footer from "../components/containers/footer/Footer.tsx";

const Layout = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-[300] max-h-[80px] bg-base-100 shadow-md">
        <NavBar />
      </header>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
