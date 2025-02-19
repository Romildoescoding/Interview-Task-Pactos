import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import UserProfile from "./components/UserProfile";
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import Orders from "./pages/Orders";
import LandingPage from "./pages/LandingPage";
import { UserProvider } from "./context/UserContext";
import UserProducts from "./pages/UserProducts";

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/user-products" element={<UserProducts />} />
            <Route path="/edit-product/:id" element={<EditProduct />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
          <UserProfile />
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
