import Rating from "./Ratings";
const Product = ({ product }) => {
  return (
    <div className="card border border-dark" id="boom">
      <a href={`/product/${product._id}`}>
        <img src={product.image} className="card-img-top" id="image" alt={product.name} />
      </a>

      <div className="card-body">
        <a href={`/product/${product._id}`} className="fs-4 text-decoration-none ">
          {product.name}
        </a>
        <div>
          <Rating value={product.rating} text={`${product.numReviews} reviews`} />
        </div>
        <p className="card-text">{product.price} ብር</p>
      </div>
    </div>
  );
};

export default Product;
