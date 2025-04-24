// src/pages/Home.jsx
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="h-screen bg-cover bg-center flex flex-col items-center justify-center text-white text-center px-4" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d')" }}>
      <h1 className="text-4xl md:text-6xl font-bold mb-6">Welcome to Employee Management System</h1>
      <div className="space-x-4">
        <Link to="/login" className="bg-blue-500 px-6 py-2 rounded hover:bg-blue-600">Login</Link>
        <Link to="/register" className="bg-green-500 px-6 py-2 rounded hover:bg-green-600">Register</Link>
      </div>
    </div>
  );
};

export default Home;
