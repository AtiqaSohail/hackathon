import React, { useEffect, useState } from "react";
// import axios from "../axios"; // your axios instance
import axios  from "../axios";
import { toast } from "react-toastify";
import { FiCheckCircle, FiLogOut, FiClock } from "react-icons/fi";

const Attendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [todayAttendance, setTodayAttendance] = useState(null);
  const [loading, setLoading] = useState(false);

  // Format date YYYY-MM-DD for today
  const todayDate = new Date().toISOString().split("T")[0];

  // Fetch attendance records and today's attendance
  const fetchAttendance = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/attendance");
      setAttendanceRecords(res.data);

      // Find today's attendance record
      const today = res.data.find((rec) => rec.date === todayDate);
      setTodayAttendance(today || null);
    } catch (error) {
      toast.error("Failed to load attendance");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  // Handle Check-In
  const handleCheckIn = async () => {
    try {
      const res = await axios.post("/attendance/check-in", { date: todayDate });
      toast.success("Checked in successfully");
      setTodayAttendance(res.data);
      setAttendanceRecords([res.data, ...attendanceRecords]);
    } catch (error) {
      toast.error(error.response?.data?.message || "Check-in failed");
    }
  };

  // Handle Check-Out
  const handleCheckOut = async () => {
    if (!todayAttendance) return;
    try {
      const res = await axios.post("/attendance/check-out", { attendanceId: todayAttendance._id });
      toast.success("Checked out successfully");
      setTodayAttendance(res.data);

      // Update attendanceRecords state to update checked out time
      setAttendanceRecords((prev) =>
        prev.map((rec) => (rec._id === res.data._id ? res.data : rec))
      );
    } catch (error) {
      toast.error(error.response?.data?.message || "Check-out failed");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Attendance</h2>

      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
        {/* Check-In Button */}
        <button
          onClick={handleCheckIn}
          disabled={todayAttendance !== null}
          className={`flex items-center gap-2 px-6 py-3 rounded-md text-white font-semibold shadow-md
            ${todayAttendance ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}`}
        >
          <FiCheckCircle size={20} />
          Check In
        </button>

        {/* Check-Out Button */}
        <button
          onClick={handleCheckOut}
          disabled={!todayAttendance || todayAttendance.checkOut !== null}
          className={`flex items-center gap-2 px-6 py-3 rounded-md text-white font-semibold shadow-md
            ${!todayAttendance || todayAttendance.checkOut ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"}`}
        >
          <FiLogOut size={20} />
          Check Out
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-600">Loading attendance records...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2">Date</th>
                <th className="border border-gray-300 p-2">Check In</th>
                <th className="border border-gray-300 p-2">Check Out</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center p-4 text-gray-500">
                    No attendance records found.
                  </td>
                </tr>
              ) : (
                attendanceRecords.map((record) => (
                  <tr
                    key={record._id}
                    className={`${record.date === todayDate ? "bg-yellow-100" : ""} hover:bg-gray-50`}
                  >
                    <td className="border border-gray-300 p-2 text-center">{record.date}</td>
                    <td className="border border-gray-300 p-2 text-center">
                      {record.checkIn ? new Date(record.checkIn).toLocaleTimeString() : "-"}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {record.checkOut ? new Date(record.checkOut).toLocaleTimeString() : "-"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Attendance;
