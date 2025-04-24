// src/components/DashboardCard.jsx
import React from "react";

const DashboardCard = ({ title, children, icon, className }) => {
  return (
    <div className={`bg-white shadow-md rounded-lg p-6 flex items-center space-x-4 ${className}`}>
      {icon && <div className="text-3xl text-blue-500">{icon}</div>}
      <div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default DashboardCard;
