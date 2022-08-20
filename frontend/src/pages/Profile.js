import {useState, useEffect} from "react";
import {useNavigate, useLocation} from "react-router-dom";

//Redux
import {useSelector, useDispatch} from "react-redux";
import {updateUser, reset} from "../features/auth/authSlice";

import Alert from "../components/Globals/Alert";
import Form from "../components/Globals/Form";

function Profile() {
  //Declarations
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation;

  //Global states
  const {user, isSuccess, isError, message} = useSelector(store => store.auth);

  //Component states
  const [formData, setFormData] = useState({
    name: user ? user.name : "",
    email: user ? user.email : "",
    password: "",
    password2: "",
  });
  const [alert, setAlert] = useState({type: "", text: ""});
  const {name, email, password, password2} = formData;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    if (isError) {
      setAlert({type: "danger", text: message});
    }

    if (isSuccess) {
      setAlert({type: "success", text: message});
    }

    dispatch(reset());
  }, [isError, isSuccess, message, dispatch, redirect, user, navigate]);

  const onChange = e => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert({type: "danger", text: "password do not match"});
    } else {
      const userData = {name, email, password};
      dispatch(updateUser(userData));
    }
  };

  return (
    <>
      {user && (
        <div className="container col-md-6 col-lg-5 col-xl-4 mx-auto mt-3">
          <section className="heading">
            <h1>
              <i className="fas fa-user"></i> User Profile
            </h1>
          </section>
          <div>{<Alert type={alert.type} text={alert.text} setAlert={setAlert} />}</div>

          <section className="form">
            <Form formData={formData} onChange={onChange} onSubmit={onSubmit} type={"Update"} />
          </section>
        </div>
      )}
    </>
  );
}

export default Profile;
