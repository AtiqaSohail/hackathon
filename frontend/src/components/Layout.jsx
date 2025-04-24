import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";

const Layout = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-4 flex-grow">
          {!token ? (
            <div className="text-center mt-20">
              <h1 className="text-2xl font-bold mb-4 text-gray-700">
                Welcome to Employee Management System
              </h1>
              <p className="mb-6 text-gray-600">
                Please login or register to access your dashboard.
              </p>
              <button
                onClick={() => navigate("/login")}
                className="bg-blue-600 text-white px-4 py-2 rounded mr-4"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Register
              </button>
            </div>
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </div>
  );
};

export default Layout;
