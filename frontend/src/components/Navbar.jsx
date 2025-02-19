import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="w-full h-[80px]"></div>
      <nav className="bg-white fixed top-0 left-0 w-full p-4 shadow-md z-20">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-black text-xl font-bold lg:mr-auto">
            Pactos Marketplace
          </Link>
          <button
            className="lg:hidden p-2 text-black"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div
            className={`lg:flex items-center space-x-4 ${
              isOpen ? "block w-full" : "hidden w-fit"
            } lg:block absolute lg:static top-16 left-0  bg-white shadow-lg lg:shadow-none p-4 lg:p-0 lg:ml-auto`}
          >
            <Link
              to="/home"
              className="block border border-zinc-200 text-zinc-700 px-4 py-2 rounded-md hover:bg-black hover:text-white transition"
            >
              Browse Products
            </Link>
            <Link
              to="/add-product"
              className="block border border-zinc-200 text-zinc-700 px-4 py-2 rounded-md hover:bg-black hover:text-white transition"
            >
              List Product
            </Link>
            <Link
              to="/user-products"
              className="block border border-zinc-200 text-zinc-700 px-4 py-2 rounded-md hover:bg-black hover:text-white transition"
            >
              Listed Products
            </Link>
            <Link
              to="/orders"
              className="block bg-black text-white px-4 py-2 rounded-md hover:opacity-80 transition"
            >
              View Orders
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
