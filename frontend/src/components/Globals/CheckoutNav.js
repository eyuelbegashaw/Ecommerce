import {Link} from "react-router-dom";

const CheckoutNav = ({step}) => {
  return (
    <div className="mb-3 text-center">
      <Link to="/signin" className="me-3 text-decoration-none fw-bold black">
        Sign In
      </Link>

      <Link
        to="/shipping "
        className={`me-3 text-decoration-none ${
          step !== 1 ? "fw-bold black" : "disabledLink text-secondary"
        }`}
      >
        Shipping
      </Link>
      <Link
        to="/payment"
        className={`me-3 text-decoration-none ${
          step === 3 || step === 4 ? "fw-bold  black" : "disabledLink text-secondary"
        }`}
      >
        Payment
      </Link>
      <Link
        to="/placeOrder"
        className={`text-decoration-none ${
          step === 4 ? "fw-bold black" : "disabledLink text-secondary"
        }`}
      >
        Place order
      </Link>
    </div>
  );
};

export default CheckoutNav;
