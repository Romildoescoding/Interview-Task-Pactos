import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Trash, Pencil, X, MapPin, Loader } from "lucide-react";
import { useUser } from "../context/UserContext";
import { backendUrl } from "../backendUrl";

function ProductCard({ product, onDelete }) {
  const [quantity, setQuantity] = useState(1);
  const { userEmail, userName } = useUser();
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [isHovered, setIsHovered] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const placeOrder = async () => {
    setIsLoading(true);
    if (!userEmail) return navigate("/");
    try {
      const response = await axios.post(`${backendUrl}/api/orders`, {
        ProductId: product.id,
        BuyerName: userName,
        BuyerEmail: userEmail,
        Quantity: quantity,
      });

      if (response.status === 201) {
        setIsOrderPlaced(true);
      }
    } catch (error) {
      console.error("Error placing order:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await axios.delete(`${backendUrl}/api/products/${product.id}`);
      setIsDeleting(false);
      setConfirmDelete(false);
      onDelete();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div
      className="relative bg-white shadow-md rounded-lg p-5 border border-gray-200 transition duration-300 hover:shadow-lg"
      // onMouseEnter={() => setIsHovered(true)}
      // onMouseLeave={() => setIsHovered(false)}
    >
      {confirmDelete && (
        <>
          {/* Modal */}
          <div className="fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow-lg w-[90%] max-w-lg">
            <div className="flex flex-col p-4 md:p-10 gap-4 relative">
              {isDeleting ? (
                <Loader
                  className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 animate-spin"
                  size={24}
                />
              ) : (
                <>
                  <button
                    className="absolute top-2 right-2 cursor-pointer p-1 rounded-full"
                    onClick={() => setConfirmDelete(false)}
                  >
                    <X size={22} />
                  </button>

                  <h1 className="text-2xl font-bold">Deleting Product</h1>
                  <h2 className="text-sm text-zinc-700">
                    Are you sure you want to delete this product? All the
                    related data will also be erased permanently.
                  </h2>

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-4">
                    <button
                      className="cursor-pointer px-4 py-2 bg-zinc-200 text-zinc-800 rounded-lg hover:bg-zinc-300 transition"
                      onClick={() => setConfirmDelete(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-4 py-2 cursor-pointer  bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                      onClick={handleDelete}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          <div
            className="fixed top-0 left-0 h-full w-full z-30 bg-[#18181b90]"
            onClick={() => setConfirmDelete(false)}
          ></div>
        </>
      )}

      {/* Order confirmation */}
      {isOrderPlaced && (
        <>
          <div className="fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg w-[90%] max-w-lg ">
            <div className="flex flex-col p-8 md:p-10 gap-4 relative">
              <button
                className="absolute top-2 right-2 cursor-pointer p-1 rounded-full"
                onClick={() => setIsOrderPlaced(false)}
              >
                <X size={22} />
              </button>

              <h2 className="text-2xl font-bold text-black ">
                🎉 Order Successful!
              </h2>

              <p className="text-gray-600 text-md ">
                Your order for{" "}
                <span className="font-semibold">{quantity}x</span>{" "}
                {product.Name} has been placed.
              </p>

              <button
                className="w-full mt-2 flex items-center justify-center gap-2 bg-zinc-950 text-white text-md font-medium py-2 rounded-md cursor-pointer transition hover:bg-zinc-800"
                onClick={() => navigate("/orders")}
              >
                Track Your Order
                <MapPin size={18} />
              </button>
            </div>
          </div>
          <div
            className="fixed top-0 left-0 h-full w-full z-30 bg-[#18181b90]"
            onClick={() => setIsOrderPlaced(false)}
          ></div>
        </>
      )}

      <div className="relative">
        <img
          src={product.ImageUrl || "/placeholder.svg"}
          alt={product.Name}
          className="w-full h-48 object-contain border-2 border-zinc-100 rounded-xl"
        />

        {userEmail === product.UploaderEmail && (
          <Link
            to={`/edit-product/${product.id}`}
            className="absolute top-0 right-0 bg-black text-white p-2 rounded-full transition-transform transform hover:scale-105"
          >
            <Pencil size={16} />
          </Link>
        )}
      </div>

      <h2 className="text-lg font-semibold text-black mt-3">{product.Name}</h2>
      <p className="text-gray-500 text-sm">
        {product.Description?.length > 50
          ? product.Description?.slice(0, 49) + ".."
          : product.Description}
      </p>
      <p className="text-lg font-bold text-black mt-2">
        ${product.Price?.toFixed(2)}
      </p>

      <div className="flex items-center gap-2 mt-3">
        <label className="text-sm font-medium text-gray-700">Quantity:</label>
        <select
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          className="border cursor-pointer border-gray-300 text-zinc-950 rounded-md px-2 py-1 text-sm"
        >
          {[...Array(10).keys()].map((num) => (
            <option key={num + 1} value={num + 1}>
              {num + 1}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={placeOrder}
          disabled={isLoading}
          className="w-full cursor-pointer bg-black text-white py-2 rounded-md text-sm font-medium transition hover:bg-zinc-800 flex justify-center items-center gap-2"
        >
          {isLoading ? (
            <Loader className="animate-spin" size={18} />
          ) : (
            "Place Order"
          )}
        </button>
      </div>

      {product.UploaderEmail === userEmail && (
        <button
          onClick={() => setConfirmDelete(true)}
          className="absolute cursor-pointer top-3 left-3 bg-gray-200 p-2 rounded-full transition hover:bg-red-500 hover:text-white"
        >
          <Trash size={16} />
        </button>
      )}
    </div>
  );
}

export default ProductCard;
