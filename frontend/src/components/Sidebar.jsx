// src/components/Sidebar.jsx
import { Link, useNavigate } from "react-router-dom";
import { FaTachometerAlt, FaCalendarCheck, FaUser, FaMoneyCheckAlt, FaSignOutAlt, FaClipboardList } from "react-icons/fa";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const links = [
    { label: "Dashboard", icon: <FaTachometerAlt />, path: "/dashboard" },
    { label: "Attendance", icon: <FaCalendarCheck />, path: "/attendance" },
    { label: "Leaves", icon: <FaClipboardList />, path: "/leaves" },
    { label: "Profile", icon: <FaUser />, path: "/profile" },
    { label: "Salary", icon: <FaMoneyCheckAlt />, path: "/salary" },
  ];

  return (
    <div className="w-64 bg-blue-700 text-white flex flex-col">
      <h2 className="text-2xl font-bold text-center py-4 border-b border-blue-500">EMS</h2>
      <nav className="flex-1">
        {links.map((link) => (
          <Link
            to={link.path}
            key={link.label}
            className="flex items-center px-6 py-3 hover:bg-blue-600"
          >
            {link.icon}
            <span className="ml-3">{link.label}</span>
          </Link>
        ))}
      </nav>
      <button onClick={handleLogout} className="flex items-center px-6 py-3 bg-red-500 hover:bg-red-600">
        <FaSignOutAlt />
        <span className="ml-3">Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;
