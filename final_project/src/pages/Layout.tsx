import { Outlet } from "react-router-dom";
import NavBar from "@/components/containers/nav/NavBar.tsx";
import { useEffect } from "react";
import Footer from "@/components/containers/footer/Footer.tsx";
import { ModeToggle } from "@/features/theme/mode-toggle";

const Layout = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-[40] max-h-[80px] bg-background shadow-md">
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
