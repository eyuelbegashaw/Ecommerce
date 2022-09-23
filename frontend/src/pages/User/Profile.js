import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

//Redux
import {useSelector, useDispatch} from "react-redux";
import {updateUser, authReset} from "../../features/auth/authSlice";

//Components
import Form from "../../components/Globals/Form";
import {ToastContainer, toast} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function Profile() {
  //Declarations
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Global states
  const {user, isSuccess, isError, message} = useSelector(store => store.auth);

  //Component states
  const [formData, setFormData] = useState({
    name: user ? user.name : "",
    email: user ? user.email : "",
    password: "",
    password2: "",
  });

  const {name, email, password, password2} = formData;

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      toast.success(message);
    }

    dispatch(authReset());
  }, [dispatch, navigate, isError, isSuccess, message, user]);

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
    } else if (password !== password2) {
      toast.error("password do not match");
    } else {
      const userData = {name, email, password};
      dispatch(updateUser(userData));
    }
  };

  return (
    <>
      <ToastContainer />
      {user && (
        <div className="container col-md-6 col-lg-5 col-xl-4 mx-auto mt-3">
          <section className="heading">
            <h1>
              <i className="fas fa-user"></i> User Profile
            </h1>
          </section>

          <section className="form">
            <Form formData={formData} onChange={onChange} onSubmit={onSubmit} type={"Update"} />
          </section>
        </div>
      )}
    </>
  );
}

export default Profile;
