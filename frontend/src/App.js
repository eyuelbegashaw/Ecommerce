import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

//Navigation component
import Header from "./components/Globals/Header/Header";

//Pages
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/cart/:productId" element={<Cart />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
