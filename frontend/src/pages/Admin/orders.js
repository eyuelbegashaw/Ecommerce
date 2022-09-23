import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

//Redux
import {useSelector, useDispatch} from "react-redux";
import {getOrders, orderReset} from "../../features/order/orderSlice";

//Components
import Order from "../../components/orders/order";
import Spinner from "../../components/Globals/Spinner";
import {toast, ToastContainer} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const Orders = () => {
  //Declarations
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {user} = useSelector(store => store.auth);
  const {orders, isError, isLoading, isSuccess, message} = useSelector(store => store.order);

  useEffect(() => {
    if (!user || !user.isAdmin) navigate("/login");
  }, [dispatch, navigate, user]);

  useEffect(() => {
    if (orders.length === 0) {
      dispatch(getOrders());
    }
  }, [dispatch, orders.length]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(orderReset());
  }, [dispatch, isError, isSuccess, message]);

  return (
    <div className="container-md">
      <ToastContainer />
      {isLoading && <Spinner />}
      {orders.length > 0 && (
        <div className="row p-0">
          <div className="col-lg-8 p-0 mx-auto">
            <table className="table table-responsive p-0">
              <thead>
                <tr>
                  <th> ID</th>
                  <th> User</th>
                  <th> Date</th>
                  <th> Total</th>
                  <th> Paid </th>
                  <th> Delivered </th>
                  <th> </th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <Order order={order} key={order._id} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
