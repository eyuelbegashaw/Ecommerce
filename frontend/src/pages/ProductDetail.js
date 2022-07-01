import { useParams } from "react-router-dom";
import products from "../products";
import Rating from "../components/Ratings";

const ProductDetail = () => {
  const { productId } = useParams();

  const product = products.find((p) => p._id === productId);

  return (
    <div className="container m-auto row mt-2">
      <div className="col-lg-6">
        <img src={product.image} className="img-fluid rounded" alt={product.name} />
      </div>
      <div className="col-lg-6 ">
        <div className="row border p-1">
          <div style={{ height: "min-content" }} className="p-1 mx-1 my-3 col-md-6">
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

          <div style={{ height: "min-content" }} className="my-3 ms-auto col-md-5 border ">
            <div class="d-flex flex-row justify-content-between my-3">
              <div>
                <span className="fw-bold">Price: </span>
              </div>

              <div>{product.price} ብር</div>
            </div>
            <hr />
            <div class="d-flex flex-row justify-content-between my-3">
              <div>
                <span className="fw-bold ">Status: </span>
              </div>
              <div>{product.countInStock > 0 ? "In Stock" : "Out of Stock"}</div>
            </div>
            <hr />
            <button
              className="btn btn-secondary bg-dark text-light"
              disabled={product.countInStock === 0}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
