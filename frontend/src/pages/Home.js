import {useEffect} from "react";

import {useSelector, useDispatch} from "react-redux";
import {getProducts} from "../features/products/productSlice";

//components
import Product from "../components/Product";
import Spinner from "../components/Spinner";

const Home = () => {
  const dispatch = useDispatch();

  const {products, isLoading, getAllError} = useSelector(store => store.product);
  const {error, message} = getAllError;

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  return (
    <>
      {isLoading && <Spinner />}
      {error && !isLoading && <h1 className="text-center mt-4">{message}</h1>}
      {products.length > 0 && (
        <div className="container">
          <h3 className="mb-2">LATEST PRODUCTS</h3>
          <div className="container" id="products">
            {products.map(product => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
