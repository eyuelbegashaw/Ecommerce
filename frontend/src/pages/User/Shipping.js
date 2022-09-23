import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

//Redux
import {useSelector, useDispatch} from "react-redux";
import {saveShippingAddress} from "../../features/cart/cartSlice";

//Components
import Form from "../../components/Shipping/Form";
import CheckoutNav from "../../components/Globals/CheckoutNav";
import {toast, ToastContainer} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const Shipping = () => {
  //Declarations
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Global states
  const {user} = useSelector(store => store.auth);
  const {shippingAddress} = useSelector(store => store.cart);

  //Components states
  const [formData, setFormData] = useState({
    address: shippingAddress.address,
    city: shippingAddress.city,
    postalCode: shippingAddress.postalCode,
    country: shippingAddress.country,
  });

  useEffect(() => {
    if (!user) navigate("/login");
  }, [navigate, user]);

  const handleChange = e => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const {address, city, postalCode, country} = formData;
    if (!address || !city || !postalCode || !country) {
      toast.error(" All fields are required");
    } else {
      dispatch(saveShippingAddress(formData));
      navigate("/payment");
    }
  };

  return (
    <div className="container col-md-6 col-lg-5 col-xl-4 mx-auto mt-3">
      <ToastContainer />
      <CheckoutNav step={2} />
      <section className="heading">
        <h1>SHIPPING</h1>
      </section>

      <section className="form">
        <Form formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
      </section>
    </div>
  );
};

export default Shipping;
