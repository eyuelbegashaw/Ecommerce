import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

//Navigation component
import Header from "./components/Header";

//Pages
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
