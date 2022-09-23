import {useState, useEffect} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";

//Redux
import {useDispatch, useSelector} from "react-redux";
import {authReset, login} from "../../features/auth/authSlice";

//Components
import Form from "../../components/Globals/Form";
import {toast, ToastContainer} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  //Declarations
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Component states
  const [formData, setFormData] = useState({email: "", password: ""});

  //Global states
  const {isError, isSuccess, message} = useSelector(store => store.auth);

  const redirect = location.search ? "/" + location.search.split("=")[1] : "/";

  const onSubmit = e => {
    e.preventDefault();
    const {email, password} = formData;
    if (email === "" || password === "") {
      toast.error("All fields required");
    } else dispatch(login(formData));
  };

  const onChange = e => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      navigate(redirect);
    }

    dispatch(authReset());
  }, [dispatch, isError, message, isSuccess, redirect, navigate]);

  return (
    <div className="container col-md-6 col-lg-5 col-xl-4 mx-auto mt-3">
      <ToastContainer />
      <h2>
        <i className="fas fa-user"></i> SIGN IN
      </h2>
      <Form formData={formData} onChange={onChange} onSubmit={onSubmit} type={"Login"} />
      <div>
        New customer ?
        <Link to={redirect ? `/register/?redirect=${redirect}` : "/register"}>Register</Link>
      </div>
    </div>
  );
};

export default Login;
