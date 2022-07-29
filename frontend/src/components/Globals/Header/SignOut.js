import {Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";

import {logout} from "../../../features/auth/authSlice";

const SignOut = () => {
  const dispatch = useDispatch();
  const {user} = useSelector(store => store.auth);
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
          <Link className="dropdown-item" to="#" onClick={() => dispatch(logout())}>
            Log out
          </Link>
        </li>
      </ul>
    </li>
  );
};

export default SignOut;
