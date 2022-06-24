import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Header />
      <main>
        <div className="container">
          <Home />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
