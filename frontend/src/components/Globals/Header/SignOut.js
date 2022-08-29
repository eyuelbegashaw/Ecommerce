import {Link, useNavigate} from "react-router-dom";

//Redux
import {useSelector, useDispatch} from "react-redux";
import {logout} from "../../../features/auth/authSlice";
import {fullAuthReset} from "../../../features/auth/authSlice";
import {fullOrderReset} from "../../../features/order/orderSlice";

const SignOut = () => {
  //Declarations
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useSelector(store => store.auth);

  const handleLogout = () => {
    navigate("/login");
    dispatch(logout());
    dispatch(fullOrderReset());
    dispatch(fullAuthReset());
  };

  return (
    <li className="nav-item dropdown">
      <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown">
        <i className="fas fa-user"></i> {user.name}
      </Link>
      <ul className="dropdown-menu">
        <li>
          <Link className="dropdown-item" to="/profile">
            Profile
          </Link>
        </li>
        <li>
          <Link className="dropdown-item" to="/myOrders">
            My Orders
          </Link>
        </li>
        <li>
          <Link className="dropdown-item" to="#" onClick={handleLogout}>
            Log out
          </Link>
        </li>
      </ul>
    </li>
  );
};

export default SignOut;
