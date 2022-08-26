import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

//Navigation component
import Header from "./components/Globals/Header/Header";

//Pages
import Home from "./pages/Home";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";

import Shipping from "./pages/Shipping";
import Payment from "./pages/Payment";
import PlaceOrder from "./pages/PlaceOrder";
import OrderDetail from "./pages/OrderDetail";

import UsersScreen from "./pages/UsersScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/cart/:productId" element={<Cart />} />

          <Route path="/shipping" element={<Shipping />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/order/:orderId" element={<OrderDetail />} />

          <Route path="/admin/users" element={<UsersScreen />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
