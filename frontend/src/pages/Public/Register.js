import {useState, useEffect} from "react";
import {useNavigate, useLocation} from "react-router-dom";

//Redux
import {useSelector, useDispatch} from "react-redux";
import {register, authReset} from "../../features/auth/authSlice";

//Components
import Form from "../../components/Globals/Form";
import {ToastContainer, toast} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
function Register() {
  //Declarations
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  //Global states
  const {isSuccess, isError, message} = useSelector(store => store.auth);

  //Component states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const {name, email, password, password2} = formData;

  const redirect = location.search ? "/" + location.search.split("=")[1] : "/";

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success(message);
      setTimeout(() => navigate(redirect), 2000);
    }

    dispatch(authReset());
  }, [dispatch, navigate, isError, isSuccess, message, redirect]);

  const onChange = e => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = e => {
    e.preventDefault();
    if (name === "" || email === "" || password === "" || password2 === "") {
      toast.error("All fields are required");
    }
    if (password !== password2) {
      toast.error("password do not match");
    } else {
      const userData = {name, email, password};
      dispatch(register(userData));
    }
  };

  return (
    <div className="container col-md-6 col-lg-5 col-xl-4 mx-auto mt-3">
      <ToastContainer />
      <section className="heading">
        <h1>
          <i className="fas fa-user"></i> SIGN UP
        </h1>
        <p>Please create an account</p>
      </section>

      <section className="form">
        <Form formData={formData} onChange={onChange} onSubmit={onSubmit} type={"Register"} />
      </section>
    </div>
  );
}

export default Register;
