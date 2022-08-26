import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

//Redux
import {useSelector, useDispatch} from "react-redux";
import {createOrder, orderReset} from "../features/order/orderSlice";

//Components
import CheckoutNav from "../components/Globals/CheckoutNav";
import Alert from "../components/Globals/Alert";

const PlaceOrder = () => {
  //Declarations
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Global states
  const {user} = useSelector(store => store.auth);
  const cart = useSelector(store => store.cart);
  const order = useSelector(store => store.order);

  //Calculate prices
  const addDecimals = num => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  const itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  );
  const shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 100);
  const taxPrice = addDecimals(Number((0.15 * itemsPrice).toFixed(2)));
  const totalPrice = (Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)).toFixed(2);

  useEffect(() => {
    if (!user) navigate("/login");
    else if (!cart.shippingAddress.address) navigate("/shipping");
    else if (!cart.paymentMethod) navigate("/payment");
    else if (cart.cartItems.length === 0) navigate("/cart");
  }, [navigate, cart, user]);

  useEffect(() => {
    if (order.isSuccess) navigate(`/order/${order.order._id}`);
    dispatch(orderReset());
  }, [dispatch, navigate, order]);

  const handlePlaceOrder = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: itemsPrice,
        shippingPrice: shippingPrice,
        taxPrice: taxPrice,
        totalPrice: totalPrice,
      })
    );
  };

  return (
    <>
      {order.isError && <Alert type={"danger"} text={order.message} />}
      <div className="container col-md-6 col-lg-5 col-xl-4 mx-auto mt-3">
        <CheckoutNav step={4} />
      </div>
      <div className="container-md mx-auto row p-2">
        <div className="col-md-7 p-0 m-0 me-2">
          <div>
            <h3>SHIPPING</h3>
            <p>
              <strong>Address : </strong>
              {cart.shippingAddress.address}, {cart.shippingAddress.city}
              {cart.shippingAddress.postalCode},{cart.shippingAddress.country}
            </p>
            <hr />
          </div>

          <div>
            <h3>PAYMENT METHOD</h3>
            <strong>Method: </strong>
            {cart.paymentMethod}
            <hr />
          </div>

          <div>
            <h3> ORDER ITEMS</h3>
            {cart.cartItems.map((item, index) => (
              <div className="row" key={index}>
                <div className="col-2">
                  <img src={item.image} alt={item.name} style={{width: 60, height: 50}} />
                </div>
                <div className="col-7">{item.name}</div>
                <div className="col-3">
                  {item.quantity} x ${item.price} = ${(item.quantity * item.price).toFixed(2)}
                </div>
              </div>
            ))}
            <hr />
          </div>
        </div>

        <div className="col-md-4 border minHeight pb-2">
          <h3>ORDER SUMMARY</h3>
          <div className="d-flex justify-content-between">
            <div>Items</div>
            <div>{itemsPrice} ብር </div>
          </div>
          <div className="d-flex justify-content-between">
            <div>Shipping</div>
            <div>{shippingPrice} ብር</div>
          </div>
          <div className="d-flex justify-content-between">
            <div>Tax</div>
            <div>{taxPrice} ብር</div>
          </div>
          <div className="d-flex justify-content-between">
            <div>Total</div>
            <div>{totalPrice} ብር</div>
          </div>
          <button className="btn btn-secondary mt-3" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </div>
      </div>
    </>
  );
};
export default PlaceOrder;
