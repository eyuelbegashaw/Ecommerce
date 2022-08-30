import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

//Redux
import {useSelector, useDispatch} from "react-redux";
import {getAllUsers, deleteUser, updateUsers} from "../features/auth/authSlice";

//Components
import User from "../components/UserScreen/User";
import Form from "../components/UserScreen/Form";

const UsersScreen = () => {
  //Declarations
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {users, user} = useSelector(store => store.auth);

  const [inputs, setInputs] = useState({id: "", name: "", email: "", isAdmin: false});

  useEffect(() => {
    if (!user || !user.isAdmin) navigate("/login");
  }, [dispatch, navigate, user]);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch, JSON.stringify(users)]);

  const handleDelete = id => {
    if (window.confirm("Are you sure ?")) {
      dispatch(deleteUser(id));
    }
  };

  const handleChange = e => {
    const name = e.target.name;
    setInputs({...inputs, [name]: e.target.value});
  };

  const handleSubmit = e => {
    e.preventDefault();
    const updatedUser = {name: inputs.name, email: inputs.email, isAdmin: inputs.isAdmin};
    dispatch(updateUsers({id: inputs.id, updatedUser}));
  };

  const handleEdit = user => {
    setInputs({id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin});
  };

  return (
    <div className="container-md">
      <Form
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        inputs={inputs}
        setInputs={setInputs}
      />
      {users.length > 0 && (
        <div className="row p-0">
          <div className="col-lg-8 p-0 mx-auto">
            <table className="table table-responsive p-0">
              <thead>
                <tr>
                  <th> ID</th>
                  <th> Name</th>
                  <th> Email</th>
                  <th> Admin</th>
                  <th> Edit </th>
                  <th> Remove</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <User
                    user={user}
                    key={user._id}
                    handleDelete={() => handleDelete(user._id)}
                    handleEdit={handleEdit}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersScreen;
