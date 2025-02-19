"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { Loader } from "lucide-react";
import { useUser } from "../context/UserContext";

const UserProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { userEmail } = useUser();

  useEffect(() => {
    if (userEmail) {
      fetchUserProducts();
    }
  }, [userEmail]);

  const fetchUserProducts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/products/user/${userEmail}`
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching user products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container text-zinc-950 mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Listed Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          <Loader
            className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 animate-spin"
            size={24}
          />
        ) : products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default UserProducts;
