import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {getProducts, reset} from "../features/products/productSlice";

//components
import Product from "../components/Home/Product";
import Spinner from "../components/Globals/Spinner";
import Alert from "../components/Globals/Alert";

const Home = () => {
  const dispatch = useDispatch();

  const {products, isLoading, isError, message} = useSelector(store => store.product);

  //fetch on mount
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  //reset on unmount
  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);
  return (
    <>
      <div>{isError && <Alert type={"danger"} text={message} />}</div>
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
      {isLoading && <Spinner />}
    </>
  );
};

export default Home;
