"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";

function EditProduct() {
  const [product, setProduct] = useState({
    Name: "",
    Description: "",
    Price: "",
    ImageUrl: "",
  });

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/products/${id}`
      );
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
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
      history.push("/");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <form onSubmit={handleSubmit} className="max-w-md">
        {["Name", "Description", "Price", "ImageUrl"].map((field) => (
          <div className="mb-4" key={field}>
            <label htmlFor={field} className="block mb-2">
              {field}
            </label>
            <input
              type={field === "Price" ? "number" : "text"}
              id={field}
              name={field}
              value={product[field] || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Update Product
        </button>
      </form>
    </div>
  );
}

export default EditProduct;
