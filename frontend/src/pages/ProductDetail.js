import { useParams } from "react-router-dom";

const ProductDetail = () => {
  let { productId } = useParams();
  return <h2 className="text-center m-3">Product {productId} </h2>;
};

export default ProductDetail;
