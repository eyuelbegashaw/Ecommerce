import {Link} from "react-router-dom";

const SignIn = () => {
  return (
    <li className="nav-item px-2">
      <Link className="nav-link" to="/login">
        <i className="fas fa-user"></i> Sign in
      </Link>
    </li>
  );
};

export default SignIn;
