import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

import {useSelector, useDispatch} from "react-redux";
import {getProduct, setProduct} from "../features/products/productSlice";

//components
import Rating from "../components/Ratings";
import Spinner from "../components/Spinner";
import Alert from "../components/Alert";

const ProductDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {productId} = useParams();
  const [quantity, setQuantity] = useState(0);
  const {products, product, isLoading, getOneError} = useSelector(store => store.product);
  const {error, message} = getOneError;

  useEffect(() => {
    if (products.length > 0) {
      dispatch(setProduct(products.find(p => p._id === productId)));
    } else {
      dispatch(getProduct(productId));
    }
  }, [dispatch, products, productId]);

  const addToCartHandler = () => {
    navigate(`/cart/${product._id}?qty=${quantity}`);
  };

  return (
    <>
      <div>{error && <Alert type={"danger"} text={message} />}</div>
      {Object.keys(product).length !== 0 && (
        <div className="container m-auto row mt-2">
          <div className="col-lg-6">
            <img src={product.image} className="img-fluid rounded" alt={product.name} />
          </div>
          <div className="col-lg-6 ">
            <div className="row border p-1">
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
      {isLoading && <Spinner />}
    </>
  );
};

export default ProductDetail;
