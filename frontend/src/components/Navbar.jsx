import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">
          Marketplace
        </Link>
        <div>
          <Link to="/" className="text-white mr-4">
            Home
          </Link>
          <Link to="/add-product" className="text-white mr-4">
            Add Product
          </Link>
          <Link to="/orders" className="text-white">
            Orders
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
