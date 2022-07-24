import {useEffect} from "react";
import {useParams, useLocation, useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {addToCartAsync, addToCart, removeFromCart} from "../features/cart/cartSlice";

const Cart = () => {
   const dispatch = useDispatch();
   const location = useLocation();
   const navigate = useNavigate();

   const {productId} = useParams();
   const {cart} = useSelector(store => store.cart);
   const quantity = Number(location.search.split("=")[1]);

   useEffect(() => {
      if (productId) {
         dispatch(addToCartAsync({productId, quantity}));
      }
   }, [dispatch, productId, quantity]);

   const handleChange = (e, product) => {
      const quantity = Number(e.target.value);
      dispatch(addToCart({...product, quantity}));
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
                           <tr key={item.product}>
                              <td>
                                 <img
                                    src={item.image}
                                    alt={item.name}
                                    style={{width: 85, height: 70}}
                                 />
                              </td>
                              <td>{item.name}</td>
                              <td>{item.price} ብር</td>
                              <td>
                                 <select
                                    value={item.quantity}
                                    style={{width: 70}}
                                    onChange={e => handleChange(e, item)}
                                 >
                                    {[...Array(item.countInStock).keys()].map(value => (
                                       <option value={value + 1} key={value + 1}>
                                          {value + 1}
                                       </option>
                                    ))}
                                 </select>
                              </td>

                              <td className="text-center">
                                 <button
                                    className="border-0"
                                    onClick={() => handleDelete(item.product)}
                                 >
                                    <i className="fa fa-trash" aria-hidden="true"></i>
                                 </button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
               <div className="border p-3 ms-lg-auto subtotal col-sm-4">
                  <p className="fs-5">
                     SUB TOTAL ({cart.reduce((total, current) => (total += current.quantity), 0)})
                     ITEMS <br />
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
