import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

//Redux
import {useSelector, useDispatch} from "react-redux";
import {
  getProduct,
  productReset,
  resetProduct,
  createReview,
} from "../../features/products/productSlice";

//Components
import Rating from "../../components/Globals/Ratings";
import Spinner from "../../components/Globals/Spinner";
import {ToastContainer, toast} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const ProductDetail = () => {
  //Declarations
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Component state
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  //Global state
  const {product, isLoading, isError, isSuccess, message} = useSelector(store => store.product);

  const {productId} = useParams();

  useEffect(() => {
    dispatch(getProduct(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    if (isError) toast.error(message);
    dispatch(productReset());
  }, [dispatch, isError, isSuccess, message]);

  useEffect(() => {
    return () => {
      dispatch(resetProduct());
    };
  }, [dispatch]);

  const addToCartHandler = () => {
    navigate(`/cart/${product._id}?quantity=${quantity}`);
  };

  const handleReview = () => {
    if (rating === 0 || comment === "") {
      toast.error("All Fields Required");
    } else {
      dispatch(
        createReview({
          productId,
          review: {
            rating,
            comment,
          },
        })
      );
    }
  };

  return (
    <div className="container">
      <ToastContainer />
      {isLoading && <Spinner />}
      {Object.keys(product).length !== 0 && (
        <div className="container m-auto row mt-2">
          <div className="col-lg-6">
            <img src={product.image} className="img-fluid rounded" alt={product.name} />
          </div>
          <div className="col-lg-6 ">
            <div className="row  p-1">
              <div style={{height: "min-content"}} className="p-1 mx-1 my-3 col-md-6">
                <p className="h3">{product.name}</p>
                <Rating value={product.rating} text={`     ${product.numReviews} reviews`} />
                <hr />
                <p>
                  <span className="fw-bold pe-1">Price: </span> {product.price} ብር
                </p>
                <hr />
                <p>
                  <span className="fw-bold pe-1">Description: </span>
                  {product.description}
                </p>
              </div>

              <div style={{height: "min-content"}} className="my-3 ms-auto col-md-5 border ">
                <div className="d-flex flex-row justify-content-between my-3">
                  <div>
                    <span className="fw-bold">Price: </span>
                  </div>

                  <div>{product.price} ብር</div>
                </div>
                <hr />
                <div className="d-flex flex-row justify-content-between my-3">
                  <div>
                    <span className="fw-bold ">Status: </span>
                  </div>
                  <div>{product.countInStock > 0 ? "In Stock" : "Out of Stock"}</div>
                </div>

                {product.countInStock > 0 && (
                  <div className="d-flex flex-row justify-content-between my-3">
                    <span className="fw-bold ">Quantity: </span>
                    <select
                      value={quantity}
                      style={{width: 70}}
                      onChange={e => setQuantity(e.target.value)}
                    >
                      {[...Array(product.countInStock).keys()].map(value => (
                        <option value={value + 1} key={value + 1}>
                          {value + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <hr />
                <button
                  className="btn btn-secondary bg-dark text-light"
                  disabled={product.countInStock === 0}
                  onClick={addToCartHandler}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-2 ms-4">
        <div className="my-2">
          <h4>REVIEWS</h4>

          {Object.keys(product).length !== 0 &&
            product.reviews.length > 0 &&
            product.reviews.map(review => (
              <div className="mb-2 p-2">
                <div className="fw-bold"> {review.name}</div>
                <p className="mb-2">{review.comment}</p>
                <Rating value={product.rating} text={""} />
              </div>
            ))}
        </div>

        <h4>WRITE A CUSTOMER REVIEW</h4>
        <div style={{width: 250}}>
          <label htmlFor="select" className="my-2">
            Rating
          </label>
          <select
            className="form-select"
            id="select"
            aria-label="Default select example"
            onChange={e => setRating(Number(e.target.value))}
          >
            <option defaultValue>Select rating</option>
            <option value="1">1 - Poor</option>
            <option value="2">2 - Fair</option>
            <option value="3">3 - Good</option>
            <option value="4">4 - Very Good</option>
            <option value="5">5 - Excellent</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="comment" className="my-2">
            Comment:
          </label>
          <textarea
            className="form-control textInput"
            rows="5"
            id="comment"
            onChange={e => setComment(e.target.value)}
          ></textarea>
        </div>

        <button className="btn btn-secondary mt-2  bg-dark text-light" onClick={handleReview}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
