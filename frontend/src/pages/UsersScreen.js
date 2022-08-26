import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

//Redux
import {useSelector, useDispatch} from "react-redux";
import {getAllUsers} from "../features/auth/authSlice";

//Components
import User from "../components/UserScreen/User";

const UsersScreen = () => {
  //Declarations
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {users, user} = useSelector(store => store.auth);

  useEffect(() => {
    if (!user || !user.isAdmin) navigate("/login");
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleDelete = userId => {
    console.log("Delete working", userId);
  };

  //user reset here
  return (
    <div className="container-md">
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
                  <th> Remove</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <User user={user} key={user._id} handleDelete={handleDelete} />
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
