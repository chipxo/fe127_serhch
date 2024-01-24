import { Outlet } from "react-router-dom";
import NavBar from "../containers/nav/NavBar";

const Layout = () => {
  return (
    <>
      <header className="sticky top-0 z-[300] shadow-md">
        <NavBar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="footer relative bottom-0 bg-base-200 p-10 text-base-content">
        <nav>
          <header className="footer-title">Services</header>
          <a className="link-hover link">Branding</a>
          <a className="link-hover link">Design</a>
          <a className="link-hover link">Marketing</a>
          <a className="link-hover link">Advertisement</a>
        </nav>
        <nav>
          <header className="footer-title">Company</header>
          <a className="link-hover link">About us</a>
          <a className="link-hover link">Contact</a>
          <a className="link-hover link">Jobs</a>
          <a className="link-hover link">Press kit</a>
        </nav>
        <nav>
          <header className="footer-title">Legal</header>
          <a className="link-hover link">Terms of use</a>
          <a className="link-hover link">Privacy policy</a>
          <a className="link-hover link">Cookie policy</a>
        </nav>
        <form>
          <header className="footer-title">Newsletter</header>
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
      </footer>
    </>
  );
};

export default Layout;
