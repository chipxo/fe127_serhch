const Footer = () => {
  return (
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
      </div>
    </footer>
  );
};

export default Footer;
