import {useState, useEffect} from "react";

//Redux
import {useSelector, useDispatch} from "react-redux";
import {getProducts, productReset} from "../../features/products/productSlice";

//Components
import Product from "../../components/Home/Product";
import Pagination from "../../components/Pagination";
import Spinner from "../../components/Globals/Spinner";
import {ToastContainer, toast} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  //Declarations
  const dispatch = useDispatch();

  //Global states
  const {products, isLoading, isError, isSuccess, message} = useSelector(store => store.product);

  //Component states
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);

  //fetch on mount
  useEffect(() => {
    if (products.length === 0) dispatch(getProducts());
  }, [dispatch, products]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(productReset());
  }, [dispatch, isError, isSuccess, message]);

  // Get current posts
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <>
      <ToastContainer />
      {isLoading && <Spinner />}
      {products.length > 0 && (
        <div className="container">
          <h3 className="mb-2">LATEST PRODUCTS</h3>
          <div className="container" id="products">
            {currentProducts.map(product => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </div>
      )}

      {products.length / productsPerPage > 1 && (
        <Pagination
          productsPerPage={productsPerPage}
          totalProducts={products.length}
          currentPage={currentPage}
          paginate={paginate}
        />
      )}
    </>
  );
};

export default Home;
