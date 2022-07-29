import Rating from "../Globals/Ratings";
import {Link} from "react-router-dom";

const Product = ({product}) => {
  return (
    <div className="card border border-dark" id="boom">
      <Link to={`/product/${product._id}`}>
        <img src={product.image} className="card-img-top" id="image" alt={product.name} />
      </Link>

      <div className="card-body">
        <Link to={`/product/${product._id}`} className="fs-4 text-decoration-none ">
          {product.name}
        </Link>
        <div>
          <Rating value={product.rating} text={`${product.numReviews} reviews`} />
        </div>
        <p className="card-text">{product.price} ብር</p>
      </div>
    </div>
  );
};

export default Product;
