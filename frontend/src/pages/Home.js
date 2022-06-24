import Product from "../components/Product";
import products from "../products";

const Home = () => {
  return (
    <>
      <h3 className="my-3">LATEST PRODUCTS</h3>
      <div className="container" id="products">
        {products && products.map((product) => <Product key={product._id} product={product} />)}
      </div>
    </>
  );
};

export default Home;