import {useEffect, useState} from "react";

import {useSelector, useDispatch} from "react-redux";
import {getProducts} from "../features/products/productSlice";

//components
import Product from "../components/Product";
import Spinner from "../components/Spinner";
import Alert from "../components/Alert";

const Home = () => {
  const dispatch = useDispatch();

  const {products, isLoading, getAllError} = useSelector(store => store.product);
  const {error, message} = getAllError;
  const {alert, setAlert} = useState({show: false, type: "", text: ""});

  useEffect(() => {
    if (!(products.length > 0)) dispatch(getProducts());
  }, [dispatch, products]);

  //handle alert
  const handleAlert = ({type, text}) => {
    setAlert({show: true, type, text});
    setTimeout(() => {
      setAlert({show: false});
    }, 6000);
  };

  return (
    <>
      <div>{error && <Alert type={"danger"} text={message} />}</div>

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
