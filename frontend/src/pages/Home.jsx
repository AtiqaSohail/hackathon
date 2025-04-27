// src/pages/Home.jsx
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col justify-center items-center text-white"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1470&q=80')",
      }}
    >
      <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
        Welcome to MERN STACK MANAGEMENT TASK
      </h1>
      <div className="space-x-4">
        <Link
          to="/login"
          className="bg-blue-500 px-6 py-2 rounded hover:bg-blue-600 drop-shadow-lg"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="bg-green-500 px-6 py-2 rounded hover:bg-green-600 drop-shadow-lg"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Home;
