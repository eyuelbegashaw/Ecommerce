import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

//Navigation component
import Header from "./components/Header";

//Pages
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/cart/:productId" element={<Cart />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
