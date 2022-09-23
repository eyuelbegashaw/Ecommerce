import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

//Redux
import {useSelector, useDispatch} from "react-redux";
import {savePaymentMethod} from "../../features/cart/cartSlice";

//Components
import CheckoutNav from "../../components/Globals/CheckoutNav";

const Payment = () => {
  //Declarations
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Global States
  const {user} = useSelector(store => store.auth);
  const {paymentMethod} = useSelector(store => store.cart);

  //Components States
  const [paymentState, setPaymentState] = useState(paymentMethod);

  useEffect(() => {
    if (!user) navigate("/login");
  }, [navigate, user]);

  const handlePayment = () => {
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/order");
  };
  return (
    <div className="container col-md-6 col-lg-5 col-xl-4 mx-auto mt-3">
      <CheckoutNav step={3} />
      <section className="heading">
        <h1>PAYMENT METHOD</h1>
        <p>Select method</p>

        <input
          type="radio"
          id="PayPal"
          name="Payment"
          value="PayPal"
          onChange={e => setPaymentState(e.target.value)}
          checked={paymentState === "PayPal"}
        />
        <label htmlFor="PayPal" className="ms-3">
          PayPal or Credit card
        </label>
        <br />

        <input
          type="radio"
          id="Stripe"
          name="Payment"
          value="Stripe"
          onChange={e => setPaymentState(e.target.value)}
          checked={paymentState === "Stripe"}
        />
        <label htmlFor="Stripe" className="ms-3">
          Stripe
        </label>
        <br />

        <button className="btn btn-secondary mt-2" onClick={handlePayment}>
          Continue
        </button>
      </section>
    </div>
  );
};

export default Payment;
