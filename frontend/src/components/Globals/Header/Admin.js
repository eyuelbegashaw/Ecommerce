import {Link} from "react-router-dom";

const Admin = () => {
  return (
    <li className="nav-item dropdown ms-3">
      <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown">
        Admin
      </Link>
      <ul className="dropdown-menu">
        <li>
          <Link className="dropdown-item" to="/admin/users">
            Users
          </Link>
        </li>
        <li>
          <Link className="dropdown-item" to="/admin/others">
            others
          </Link>
        </li>
      </ul>
    </li>
  );
};

export default Admin;
