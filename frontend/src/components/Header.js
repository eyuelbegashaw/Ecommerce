import { Outlet, Link } from "react-router-dom";
import Footer from "./Footer";
const Header = () => {
  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <Link className="navbar-brand" to="/">
              EthioShop
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item px-2">
                  <Link className="nav-link active" to="/">
                    <i className="fas fa-shopping-cart"></i> Cart
                  </Link>
                </li>
                <li className="nav-item px-2">
                  <Link className="nav-link" to="/">
                    <i className="fas fa-user"></i> Sign in
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Header;
