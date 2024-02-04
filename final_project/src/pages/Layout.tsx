import Footer from "@/components/containers/footer/Footer.tsx";
import NavBar from "@/components/containers/nav/NavBar.tsx";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <header className="bg-header-bg sticky top-0 z-[40] max-h-[80px] bg-background bg-cover bg-center bg-no-repeat shadow-md">
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
