import {useEffect, useState} from "react";
import {useParams, useLocation, useNavigate} from "react-router-dom";

//Redux
import {useSelector, useDispatch} from "react-redux";
import {addToCartAsync, removeFromCart} from "../features/cart/cartSlice";

//Components
import Alert from "../components/Globals/Alert";
import CartItem from "../components/Cart/CartItem";

const Cart = () => {
  //Declarations
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const {productId} = useParams();

  //Global states
  const {user} = useSelector(store => store.auth);
  const {cartItems} = useSelector(store => store.cart);

  //Component states
  const [alert, setAlert] = useState({type: "", text: ""});

  const quantity = Number(location.search.split("=")[1]);

  useEffect(() => {
    if (productId && quantity) {
      dispatch(addToCartAsync({productId, quantity}));
    }
  }, [dispatch, productId, quantity]);

  const handleQuantity = (e, productId) => {
    const quantity = Number(e.target.value);
    dispatch(addToCartAsync({productId, quantity}));
  };

  const handleCheckout = () => {
    if (user) navigate("/shipping");
    else navigate("/login/?redirect=shipping");
  };

  const handleDelete = productId => {
    dispatch(removeFromCart(productId));
  };

  const subTotal = cartItems.reduce((total, current) => (total += current.quantity), 0);
  const totalItems = cartItems
    .reduce((total, current) => total + current.price * current.quantity, 0)
    .toFixed(2);

  return (
    <div className="container-md">
      <h4 className="my-2 text-center">SHOPPING CART</h4>
      <div>
        {alert.text !== "" && <Alert type={alert.type} text={alert.text} setAlert={setAlert} />}
      </div>
      {cartItems.length === 0 && (
        <>
          <div className="text-center h1 mt-5">
            <i className="fa-solid fa-cart-shopping "></i>
          </div>
          <p className="text-center fs-3">Your cart is currently empty</p>
        </>
      )}
      {cartItems.length > 0 && (
        <div className="row p-0">
          <div className="col-lg-8 p-0">
            <table className="table table-responsive p-0">
              <thead>
                <tr>
                  <th> Image</th>
                  <th> Name</th>
                  <th> Price</th>
                  <th> Quantity</th>
                  <th> Remove</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map(item => (
                  <CartItem
                    key={item.product}
                    item={item}
                    handleDelete={handleDelete}
                    handleQuantity={handleQuantity}
                  />
                ))}
              </tbody>
            </table>
          </div>
          <div className="border p-3 ms-lg-auto subtotal col-sm-4">
            <p className="fs-5">
              SUB TOTAL {subTotal}
              ITEMS <br /> {totalItems} ብር
            </p>

            <button
              disabled={cartItems.length === 0}
              className="border text-white bg-dark px-4 py-2"
              onClick={handleCheckout}
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
