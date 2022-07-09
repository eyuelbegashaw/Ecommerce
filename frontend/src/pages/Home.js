import { useEffect, useState } from "react";
import Product from "../components/Product";
import axios from "axios";
//import products from "../products";

const Home = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("/api/products");
      setProducts(data);
    };

    fetchProducts();
  }, []);
  return (
    <div className="container">
      <h3 className="my-3">LATEST PRODUCTS</h3>
      <div className="container" id="products">
        {products && products.map((product) => <Product key={product._id} product={product} />)}
      </div>
    </div>
  );
};

export default Home;
