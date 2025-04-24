// src/pages/Dashboard.jsx
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-50">
        <h1 className="text-2xl font-semibold">Welcome to your Dashboard</h1>
        {/* More content can go here later */}
      </div>
    </div>
  );
};

export default Dashboard;
