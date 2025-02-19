"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";

function EditProduct() {
  const [product, setProduct] = useState({
    Name: "",
    Description: "",
    Price: "",
    ImageUrl: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `http://localhost:5000/api/products/${id}`
      );
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/products/${id}`, product);
      navigate("/user-products");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gray-100 p-6">
      {isLoading ? (
        <Loader
          className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 animate-spin"
          size={32}
        />
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
          <h1 className="text-2xl text-center font-bold text-black mb-6">
            Edit Product
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {["Name", "Description", "Price", "ImageUrl"].map((field) => (
              <div key={field}>
                <label
                  htmlFor={field}
                  className="block font-medium text-gray-700"
                >
                  {field}
                </label>
                <input
                  type={field === "Price" ? "number" : "text"}
                  id={field}
                  name={field}
                  value={product[field] || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
              </div>
            ))}
            <button
              type="submit"
              className="w-full cursor-pointer bg-black text-white px-4 py-2 rounded-md hover:bg-zinc-800 transition duration-300"
            >
              Update Product
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default EditProduct;
