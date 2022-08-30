import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {login} from "../features/auth/authSlice";
import {reset} from "../features/auth/authSlice";

//components
import Alert from "../components/Globals/Alert";
import Form from "../components/Globals/Form";

const Login = () => {
  //Declarations
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Component states
  const [alert, setAlert] = useState({type: "", text: ""});
  const [formData, setFormData] = useState({email: "", password: ""});

  //Global states
  const {isError, isSuccess, message} = useSelector(store => store.auth);

  const redirect = location.search ? "/" + location.search.split("=")[1] : "/";

  const onSubmit = e => {
    e.preventDefault();
    dispatch(login(formData));
  };

  const onChange = e => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (isError) {
      setAlert({type: "danger", text: message});
    }
    if (isSuccess) {
      navigate(redirect);
    }

    dispatch(reset());
  }, [dispatch, isError, message, isSuccess, redirect, navigate]);

  return (
    <div className="container col-md-6 col-lg-5 col-xl-4 mx-auto mt-3">
      <h2>
        <i className="fas fa-user"></i> SIGN IN
      </h2>
      <div>{<Alert type={alert.type} text={alert.text} setAlert={setAlert} />}</div>
      <Form formData={formData} onChange={onChange} onSubmit={onSubmit} type={"Login"} />
      <div>
        New customer ?
        <Link to={redirect ? `/register/?redirect=${redirect}` : "/register"}>Register</Link>
      </div>
    </div>
  );
};

export default Login;
