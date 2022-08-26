import {useSelector} from "react-redux";
import {Outlet, Link} from "react-router-dom";

//components
import Footer from "../Footer";
import SignIn from "./SignIn";
import SignOut from "./SignOut";
import Admin from "./Admin";

const Header = () => {
  const {user} = useSelector(store => store.auth);
  return (
    <>
      <header className="w-100">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark w-100">
          <div className="container-sm w-100">
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
                  <Link className="nav-link active" to="/cart">
                    <i className="fas fa-shopping-cart"></i> Cart
                  </Link>
                </li>

                {user ? <SignOut /> : <SignIn />}
                {user && user.isAdmin && <Admin />}
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
