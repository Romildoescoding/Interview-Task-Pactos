import { useState } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function Home() {
  const { setUserEmail, setUserName } = useUser();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setUserEmail(email);
    setUserName(username);
    navigate("/home");
  };

  return (
    <div className="flex flex-col items-center justify-center bg-white text-black p-6">
      <h1 className="text-4xl font-bold mb-4 text-center">
        Welcome to <span className="text-black">Pactos Marketplace</span> 🎉
      </h1>
      <p className="text-lg text-zinc-600 text-center mb-6">
        Go have fun listing products, browsing amazing deals, and ordering them
        right away!
      </p>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-sm p-6 rounded-md"
      >
        <label className="block mb-2 text-lg font-semibold">
          Enter your email to get started:
        </label>
        <input
          type="text"
          className="w-full p-3 border mb-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="mt-4 w-full cursor-pointer bg-black text-white p-3 rounded-md hover:bg-zinc-800 transition-all"
        >
          Get Started
        </button>
      </form>
    </div>
  );
}

export default Home;
