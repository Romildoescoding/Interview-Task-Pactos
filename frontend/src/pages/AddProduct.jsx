"use client";

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

function AddProduct() {
  const { userEmail } = useUser();
  const [product, setProduct] = useState({
    Name: "",
    Description: "",
    Price: "",
    ImageUrl: "",
    UploaderEmail: userEmail,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/products", product);
      navigate("/home");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        {!userEmail ? (
          <div className="flex flex-col gap-6 w-full h-fit py-8">
            <h1 className="text-2xl font-bold text-center">
              Login to List your products
            </h1>
            <button
              className="p-2 px-4 w-full rounded-md hover:bg-zinc-800 cursor-pointer bg-black text-white"
              onClick={() => navigate("/")}
            >
              Login
            </button>
          </div>
        ) : (
          <>
            <h1 className="text-2xl text-center font-bold text-black mb-6">
              Add New Product
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
                    value={product[field]}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    required
                  />
                </div>
              ))}
              <button
                type="submit"
                className="w-full bg-black text-white px-4 py-2 rounded-md hover:bg-zinc-800 cursor-pointer transition duration-300"
              >
                Add Product
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default AddProduct;
