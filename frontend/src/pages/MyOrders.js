import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

//Redux
import {useSelector, useDispatch} from "react-redux";
import {getMyOrders, orderReset} from "../features/order/orderSlice";

//Components
import Alert from "../components/Globals/Alert";
import OrderRow from "../components/MyOrder/OrderRow";

const MyOrders = () => {
  //Declarations
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useSelector(store => store.auth);
  const {myOrders, isSucess, isError, message} = useSelector(store => store.order);

  useEffect(() => {
    if (!user) navigate("/login");
    dispatch(getMyOrders());
  }, [dispatch]);

  //reset on unmount
  useEffect(() => {
    return () => {
      dispatch(orderReset());
    };
  }, [dispatch]);

  //user reset here
  return (
    <div className="container-md">
      {isError && <Alert type={"danger"} text={message} />}

      {myOrders.length > 0 && (
        <div className="row p-0">
          <div className="col-lg-8 p-0 mx-auto">
            <table className="table table-responsive p-0">
              <thead>
                <tr>
                  <th> ID</th>
                  <th> Date</th>
                  <th> Total</th>
                  <th className="text-center"> Paid</th>
                  <th className="text-center"> Delivered</th>
                </tr>
              </thead>
              <tbody>
                {myOrders.map(order => (
                  <OrderRow order={order} key={order._id} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {myOrders.length === 0 && isSucess && (
        <h4 className="text-center m-2">You have no order at the moment</h4>
      )}
    </div>
  );
};

export default MyOrders;
