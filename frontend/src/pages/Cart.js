import {useEffect, useState} from "react";
import {useParams, useLocation, useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {addToCartAsync, removeFromCart} from "../features/cart/cartSlice";

import Alert from "../components/Globals/Alert";
import CartItem from "../components/Cart/CartItem";

const Cart = () => {
  //initializations
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const {productId} = useParams();

  const [alert, setAlert] = useState({type: "", text: ""});

  const {cart} = useSelector(store => store.cart);

  const quantity = Number(location.search.split("=")[1]);

  useEffect(() => {
    if (productId) {
      dispatch(addToCartAsync({productId, quantity}));
    }
  }, [dispatch, productId, quantity]);

  const handleQuantity = (e, productId) => {
    const quantity = Number(e.target.value);
    dispatch(addToCartAsync({productId, quantity}));
  };

  const handleCheckout = () => {
    navigate("/login/?redirect=shipping");
  };

  const handleDelete = productId => {
    dispatch(removeFromCart(productId));
  };

  return (
    <div className="container-md">
      <h4 className="mt-2 mb-4 text-center">SHOPPING CART</h4>
      <div>
        {alert.text !== "" && <Alert type={alert.type} text={alert.text} setAlert={setAlert} />}
      </div>
      {cart.length === 0 && (
        <>
          <div className="text-center h1 mt-5">
            <i className="fa-solid fa-cart-shopping "></i>
          </div>
          <p className="text-center fs-3">Your cart is currently empty</p>
        </>
      )}
      {cart.length > 0 && (
        <div className="mx-auto row">
          <div className="col-lg-8">
            <table className="table table-responsive">
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
                {cart.map(item => (
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
              SUB TOTAL ({cart.reduce((total, current) => (total += current.quantity), 0)}) ITEMS{" "}
              <br />
              {cart
                .reduce((total, current) => total + current.price * current.quantity, 0)
                .toFixed(2)}{" "}
              ብር
            </p>

            <button
              disabled={cart.length === 0}
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
