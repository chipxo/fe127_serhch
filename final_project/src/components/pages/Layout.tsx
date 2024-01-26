import { Outlet } from "react-router-dom";
import NavBar from "../containers/nav/NavBar";
import { useEffect } from "react";

const Layout = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-[300] bg-base-100 shadow-md">
        <NavBar />
      </header>
      <main className="min-h-[70vh]">
        <Outlet />
      </main>
      <footer className="bg-base-200 p-10 font-Merriweather text-base-content">
        <div className="container footer">
          <nav>
            <header className="footer-title font-light">Services</header>
            <a className="link-hover link">Branding</a>
            <a className="link-hover link">Design</a>
            <a className="link-hover link">Marketing</a>
            <a className="link-hover link">Advertisement</a>
          </nav>
          <nav>
            <header className="footer-title font-light">Company</header>
            <a className="link-hover link">About us</a>
            <a className="link-hover link">Contact</a>
            <a className="link-hover link">Jobs</a>
            <a className="link-hover link">Press kit</a>
          </nav>
          <nav>
            <header className="footer-title font-light">Legal</header>
            <a className="link-hover link">Terms of use</a>
            <a className="link-hover link">Privacy policy</a>
            <a className="link-hover link">Cookie policy</a>
          </nav>
          <form>
            <header className="footer-title font-light">Newsletter</header>
            <fieldset className="form-control w-80">
              <label className="label">
                <span className="label-text">Enter your email address</span>
              </label>
              <div className="join">
                <input
                  type="text"
                  placeholder="username@site.com"
                  className="input join-item input-bordered"
                />
                <button className="btn btn-primary join-item">Subscribe</button>
              </div>
            </fieldset>
          </form>
        </div>
      </footer>
    </>
  );
};

export default Layout;
